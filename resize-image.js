const sharp = require("sharp");

sharp("public/wavico-logo-640-text.png")
  .resize(192, 192, {
    fit: "contain",
    background: { r: 255, g: 255, b: 255, alpha: 0 },
  })
  .toFile("public/android-chrome-192x192.png")
  .then((info) => {
    console.log("Image resized successfully:", info);
  })
  .catch((err) => {
    console.error("Error resizing image:", err);
  });
