const axios = require("axios");
const cheerio = require("cheerio");

export default async function handler(req, res) {
  if (req.method === "GET") {
    return res.status(202).json("404 Not found");
  } else if (req.method === "POST") {
    try {
      const url = `https://www.idealista.com/en/inmueble/${req.body.formData.listing}/`;
      const { data } = await axios.get(url, {
        headers: {
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
          "Accept-Encoding": "gzip, deflate, br",
          "Accept-Language": "en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7,pa;q=0.6",
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36",
          Referer: url,
          "Cache-Control": "max-age=0",
          path: `/en/inmuenle/${req.body.formData.listing}`,
          scheme: "https",
          method: "GET",
          authority: "www.idealista.com",
        },
      });

      const $ = cheerio.load(data);
      var ret = { url };

      ret.title = $(".main-info__title-main").text();
      ret.location = $(".main-info__title-minor").text();
      ret.price = $(".info-data-price").text();
      ret.description = $(".commentsContainer .comment").text().trim();
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
      ret.images = images;

      return res.status(200).json(ret);
    } catch (e) {
      res.status(204).json({ message: "Not Working" });
    }
  } else if (req.method === "PATCH") {
    res.status(200).json(req.body.data);
  }
}
