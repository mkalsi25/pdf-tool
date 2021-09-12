const cheerio = require("cheerio");
const axios = require("axios");

export default function handler(req, res) {
  if (req.method === "GET") {
    axios
      .get(
        "https://www.kyero.com/en/property/10453972-apartment-for-sale-santa-eulalia-del-rio"
      )
      .then((info) => {
        const $ = cheerio.load(info.data);
        const property = [];
        const description = [];
        const title = $("title").first().text();
        $(".carousel-track li").each((index, element) => {
          property.push({
            src: $(element)
              .attr("data-src")
              .replace(
                "https://d2hhh2ewuz3i8z.cloudfront.net/crop/960x720/",
                ""
              ),
          });
        });
        $("#property-expandable-description").each((index, element) => {
          description.push({
            text: $(element).find("p").text() + " ",
          });
        });
        res
          .status(200)
          .json({ name: title, image: property, details: description });
      });
  } else if (req.method === "POST") {
    axios.get(req.body.formData.url).then((info) => {
      const $ = cheerio.load(info.data);
      const property = [];
      const description = [];
      const title = $("title").first().text();
      $(".carousel-track li").each((index, element) => {
        property.push({
          src: $(element)
            .attr("data-src")
            .replace("https://d2hhh2ewuz3i8z.cloudfront.net/crop/960x720/", ""),
        });
      });
      $("#property-expandable-description").each((index, element) => {
        description.push({
          text: $(element).find("p").text() + " ",
        });
      });
      res
        .status(200)
        .json({ name: title, image: property, details: description });
    });
  } else if (req.method === "PATCH") {
    res.status(200).json(req.body.data);
  }
}
