// const cheerio = require("cheerio");
// const axios = require("axios");
import axios from "axios";
// import fs from "fs";
import path from "path";
export default async function handler(req, res) {
  if (req.method === "GET") {
    return res.status(202).json("404 Not found");
  } else if (req.method === "POST") {
    try {
      await axios
        .get("https://api.apify.com/v2/datasets/6rDhjDjjtLLvrG2W9/items")
        .then((info) => {
          if (info.data) {
            const data = info.data;
            data.map((d, index) => {
              if (d.url === req.body.formData.url) {
                // downloadFile(d.image, "../../../../public");

                return res.status(200).json({
                  name: d.title,
                  image: [{ src: `/${path.basename(d.image)}` }],
                  details: d.description,
                });
              }
            });
          }
        });
    } catch (e) {
      res.status(200).json(e);
    }
  }
}
