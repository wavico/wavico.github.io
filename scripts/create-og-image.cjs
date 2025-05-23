const sharp = require("sharp");
const fs = require("fs");

const svgBuffer = fs.readFileSync("public/og-image.svg");

sharp(svgBuffer)
  .png()
  .toFile("public/og-image.png")
  .then((info) => {
    console.log("OG 이미지 생성 완료:", info);
  })
  .catch((err) => {
    console.error("에러 발생:", err);
  });
