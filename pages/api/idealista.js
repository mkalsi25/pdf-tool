// const cheerio = require("cheerio");
// const axios = require("axios");
import axios from "axios";
// import fs from "fs";
import path from "path";
export default async function handler(req, res) {
  // const downloadFile = async (fileUrl, downloadFolder) => {
  //   const fileName = path.basename(fileUrl);
  //   const localFilePath = path.resolve(__dirname, downloadFolder, fileName);
  //   try {
  //     const response = await axios({
  //       method: "GET",
  //       url: fileUrl,
  //       responseType: "stream",
  //     });

  //     const w = response.data.pipe(fs.createWriteStream(localFilePath));
  //     w.on("finish", () => {
  //       console.log("Successfully downloaded file!");
  //     });
  //   } catch (err) {
  //     throw new Error(err);
  //   }
  // };
  if (req.method === "GET") {
    // await axios
    //   .get("https://api.apify.com/v2/datasets/6rDhjDjjtLLvrG2W9/items")
    //   .then((rout) => {
    //     res.status(200).json(rout.data);
    //     // if (rout.data) {
    //     //   const data = rout.data;
    //     //   data.map((d, index) => {
    //     //     return res.status(200).json(d.image);
    //     //   });
    //     // }
    //   });
  } else if (req.method === "POST") {
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
  }
}
