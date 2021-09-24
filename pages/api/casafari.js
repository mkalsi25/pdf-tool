const puppeteer = require("puppeteer");

export default async function handler(req, res) {
  function run() {
    return new Promise(async (resolve, reject) => {
      try {
        const browser = await puppeteer.launch({ headless: false }); //browser initiate
        const page = await browser.newPage(); // opening a new blank page
        await page.goto(
          "https://www.casafari.com/home-sale/property-" + req.body.formData.id,
          {
            waitUntil: "domcontentloaded",
          }
        ); // navigate to url and wait until page loads completely

        await page.waitForSelector(".authentication-form");
        await page.type("#email", process.env.NEXT_AUTH_EMAIL, { delay: 100 });
        await page.type("#password", process.env.NEXT_AUTH_PASSWORD, {
          delay: 100,
        });
        await Promise.all([
          page.click(
            "#app > div > div.authentication-form > div > div > form > div.registration-form__row.registration-form__row_btn-holder > button"
          ),
          page.waitForNavigation({ waitUntil: "domcontentloaded" }),
        ]);

        await page.waitForSelector(".estate-details-wrapper");
        let content = await page.evaluate(() => {
          let results = [];
          let images = document.querySelectorAll(
            ".image-gallery-slide div .image-gallery-image"
          );
          let features = document.querySelectorAll(
            ".list-characteristics li span"
          );

          results.push({
            title: document.querySelector(".title-name-holder").innerHTML,
            price: document.querySelector("#seller-details tbody tr .col2")
              .innerHTML,
            status: document.querySelector("#seller-details tbody tr .col3")
              .innerHTML,
            rooms: document.querySelector("#seller-details tbody tr .col4")
              .innerHTML,
            beds: document.querySelector("#seller-details tbody tr .col5")
              .innerHTML,
            baths: document.querySelector("#seller-details tbody tr .col6")
              .innerHTML,
            content: document.querySelector("#seller-details tbody tr .col8")
              .innerHTML,
            surface: document.querySelector("#seller-details tbody tr .col7")
              .innerHTML,

            id: 1,
            image: Array.from(images).map((item) => {
              return { src: item.getAttribute("src") };
            }),
            features: Array.from(features).map((item) => {
              return item.innerHTML;
            }),
          });

          return results;
        });
        await browser.close();
        return res.status(200).json(content), resolve(content);
      } catch (e) {
        return reject(e);
      }
    });
  }

  if (req.method === "POST") {
    return run();
  }
}
