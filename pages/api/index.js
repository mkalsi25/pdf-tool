const cheerio = require("cheerio");
const axios = require("axios");

export default async function handler(req, res) {
  if (req.method === "GET") {
    return res.status(404).json("404 Not found");
  } else if (req.method === "POST") {
    try {
      // console.log(req.body.url);
      const { data, error } = await axios.get(req.body.url);

      if (error) throw error;

      const $ = cheerio.load(data);
      const property = [];
      const title = $("title").first().text();

      const collectionImage = $(
        "div[data-target='property-gallery.track'] ul li"
      );
      // console.log(collectionImage.length);
      const details = $("#property-expandable-description").find("p").text();
      const regular = $("#property-regular-description").find("p").text();

      collectionImage.map((idx, el) => {
        const src = $(el).attr("data-src");
        if (src) {
          property.push(`https://${src.split("https://")[2]}`);
        }
      });

      res.status(200).json({
        name: title,
        image: property,
        details: details ? details : regular,
      });
    } catch (e) {
      res.status(404).json(e);
    }
  } else if (req.method === "PATCH") {
    try {
      res.status(200).json(req.body);
    } catch (e) {
      res.status(404).json(e);
    }
  }
}
