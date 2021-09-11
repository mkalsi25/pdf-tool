// const cheerio = require("cheerio");
// const axios = require("axios");
import axios from "axios";
import cheerio from "cheerio";
import fs from "fs";
import path from "path";
export default async function handler(req, res) {
  const downloadFile = async (fileUrl, downloadFolder) => {
    const fileName = path.basename(fileUrl);
    const localFilePath = path.resolve(__dirname, downloadFolder, fileName);
    try {
      const response = await axios({
        method: "GET",
        url: fileUrl,
        responseType: "stream",
      });

      const w = response.data.pipe(fs.createWriteStream(localFilePath));
      w.on("finish", () => {
        console.log("Successfully downloaded file!");
      });
    } catch (err) {
      throw new Error(err);
    }
  };

  if (req.method === "GET") {
    await axios
      .get(
        "https://es.rentalia.com/47509?rooms=1&idgeo=21&tpre=d&chars=piscina&idtipo2=1&idtipo3=1"
      )
      .then((info) => {
        const $ = cheerio.load(info.data);
        const property = [];
        const description = [];
        const title = $("title").first().text();
        $(".carouselList li").each((index, element) => {
          property.push({
            src: $(element)
              .find("img")
              .attr("ng-src")
              .replace("https://img00.rhimg.com/", "/"),
          });

          downloadFile(
            $(element).find("img").attr("ng-src"),
            "../../../../public"
          );
        });
        $(".houseDescription").each((index, element) => {
          description.push({
            text: $(element).find("p").text() + " ",
          });
        });
        res
          .status(200)
          .json({ name: title, image: property, details: description });
      });
  } else if (req.method === "POST") {
    await axios.get(req.body.formData.url).then((info) => {
      const $ = cheerio.load(info.data);
      const property = [];
      const description = [];
      const title = $("title").first().text();
      $(".carouselList li").each((index, element) => {
        property.push({
          src: $(element)
            .find("img")
            .attr("ng-src")
            .replace("https://img00.rhimg.com/", "/"),
        });
        downloadFile(
          $(element).find("img").attr("ng-src"),
          "../../../../public"
        );
      });
      $(".houseDescription").each((index, element) => {
        description.push({
          text: $(element).find("p").text() + " ",
        });
      });
      res
        .status(200)
        .json({ name: title, image: property, details: description });
    });
  }
}
