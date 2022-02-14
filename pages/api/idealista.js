const axios = require("axios");
const cheerio = require("cheerio");

// const sample = (array) => array[Math.floor(Math.random() * array.length)];
// import { getProxies } from "../../lib/getProxies";
export default async function handler(req, res) {
  // const proxies = await getProxies();
  if (req.method === "GET") {
    return res.status(202).json("404 Not found");
  } else if (req.method === "POST") {
    try {
      const url = `https://www.idealista.com/en/inmueble/${req.body.id}/`;
      // const proxy = sample(proxies);
      // console.log(proxy);
      const { data } = await axios.get(url, {
        headers: {
          Accept: "*/*",
          "Accept-Encoding": "gzip, deflate, br",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:92.0) Gecko/20100101 Firefox/92.0",
          Referer: url,
        },
        // proxy: proxy,
      });

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
