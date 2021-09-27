const cheerio = require("cheerio");
const axios = require("axios");

export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json("That's it.");
  } else if (req.method === "POST") {
    try {
      axios.get(req.body.formData.url).then((info) => {
        const $ = cheerio.load(info.data);
        const property = [];
        const description = [];
        const title = $("title").first().text();
        $(".carousel-track li").each((index, element) => {
          property.push({
            src: $(element).attr("data-src"),
          });
        });
        $("#property-expandable-description").each((index, element) => {
          description.push({
            text: $(element).find("p").text() + " ",
          });
        });
        res
          .status(200)
          .json({
            name: title,
            image: property === [] ? null : property,
            details: description === [] ? null : description,
          });
      });
    } catch (e) {
      res.status(200).json(e);
    }
  } else if (req.method === "PATCH") {
    res.status(200).json(req.body.data);
  }
}
