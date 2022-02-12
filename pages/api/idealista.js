const axios = require("axios");
const cheerio = require("cheerio");

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const headers = [
  {
    Accept:
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "en-US,en;q=0.9",
    "Sec-Ch-Ua":
      '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
    "Sec-Ch-Ua-Mobile": "?0",
    "Sec-Fetch-Dest": "document",
    "Sec-Fetch-Mode": "navigate",
    "Sec-Fetch-Site": "none",
    "Sec-Fetch-User": "?1",
    "Upgrade-Insecure-Requests": "1",
    "User-Agent":
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36",
  },
  {
    Accept:
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "en-US,en;q=0.5",
    "Sec-Fetch-Dest": "document",
    "Sec-Fetch-Mode": "navigate",
    "Sec-Fetch-Site": "none",
    "Sec-Fetch-User": "?1",
    "Upgrade-Insecure-Requests": "1",
    "User-Agent":
      "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:90.0) Gecko/20100101 Firefox/90.0",
  },
];
export default async function handler(req, res) {
  if (req.method === "GET") {
    return res.status(202).json("404 Not found");
  } else if (req.method === "POST") {
    try {
      // console.log(req.body);
      const url = `https://www.idealista.com/en/inmueble/${req.body.id}/`;
      const { data } = await axios.get(url, { headers: sample(headers) });

      const $ = cheerio.load(data);
      var ret = { url };

      ret.name = $("h1 .main-info__title-main").text();
      ret.location = $(".main-info__title-minor").text();
      ret.price = $(".info-data-price").text();
      ret.details = $(".commentsContainer .comment").text().trim();
      var [area, beds] = $(".info-features > span").map((idx, el) =>
        $(el).text().trim().replace("\n", "")
      );
      ret.area = area;
      ret.beds = parseInt(beds);
      $("#details.details-box > .details-property > div").map((idx, div) => {
        const title = $("h3", div).text();
        ret[title] = $("li", div)
          .map((idx, li) => $(li).text().trim())
          .toArray();
      });
      delete ret[""];

      var images = [];
      var regex = /imageDataService:"(.+?),WEB_DETAIL"/gm;
      var match = regex.exec(data);
      while (match != null) {
        images = [...images, match[1]];
        match = regex.exec(data);
      }
      ret.image = images;

      return res.status(200).json(ret);
    } catch (e) {
      res.status(404).json({ message: "Not Working" });
    }
  } else if (req.method === "PATCH") {
    try {
      res.status(200).json(req.body);
    } catch (e) {
      res.status(404).json(e);
    }
  }
}
