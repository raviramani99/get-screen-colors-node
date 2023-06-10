const screenshot = require("screenshot-desktop");
const fs = require("fs");

const captureScreenshot = () => {
  return new Promise((resolve, reject) => {
    screenshot().then((imageBuffer) => {
      resolve(imageBuffer);
    }).catch((error) => {
      reject(error);
    });
  });
};

const saveScreenshot = async () => {
  try {
    const imageBuffer = await captureScreenshot();
    const fileName = "screenshot.png";
    fs.writeFileSync(fileName, imageBuffer);
    console.log(`Screenshot captured and saved as '${fileName}'`);
  } catch (error) {
    console.error("Error:", error);
  }
};

saveScreenshot();
