const sharp = require("sharp");
const fs = require("fs");

const svgBuffer = fs.readFileSync("public/wavico-logo.svg");

sharp(svgBuffer)
  .resize(640, 640)
  .png()
  .toFile("public/wavico-logo-640.png")
  .then((info) => {
    console.log("변환 완료:", info);
  })
  .catch((err) => {
    console.error("에러 발생:", err);
  });
