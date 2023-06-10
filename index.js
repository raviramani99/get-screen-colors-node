import { extractColors, getMajorColor, divideScreenshot } from "./controllers/color-extractor.js";

const rows = 3;
const columns = 3;

const getColorData = async () => {
  const swatches = await extractColors();
  if (swatches) {
    // console.log("Color Palette:");
    // console.log("Vibrant:", );
    // console.log("Muted:", );
    // console.log("DarkVibrant:", getColorText(swatches.DarkVibrant.getHex()));
    // console.log("DarkMuted:", getColorText(swatches.DarkMuted.getHex()));
    // console.log("LightVibrant:", getColorText(swatches.LightVibrant.getHex()));
    // console.log("LightMuted:", getColorText(swatches.LightMuted.getHex()));
    const majorColor = getMajorColor(swatches);
    console.log(getColorText(majorColor), getColorText(swatches.Vibrant.getHex()), getColorText(swatches.Muted.getHex()), getColorText(swatches.DarkVibrant.getHex()), getColorText(swatches.DarkMuted.getHex()), getColorText(swatches.LightVibrant.getHex()), getColorText(swatches.LightMuted.getHex()));
  }
};

const getColorText = (color) => {
  return `\x1b[48;2;${hexToRgb(color)}m     \x1b[0m`;
};

const hexToRgb = (hex) => {
  hex = hex.replace("#", "");
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `${r};${g};${b}`;
};


const processScreenshot = async () => {
  const colorsMatrix = await divideScreenshot(rows, columns);
  if (colorsMatrix) {
    console.log(" ");
    // console.log("Colors Matrix:", colorsMatrix);
    for (let i = 0; i < colorsMatrix.length; i++) {
      let logStatement = " ";
      
      for (let j = 0; j < colorsMatrix[i].length; j++) {
        logStatement += getColorText(colorsMatrix[i][j]) + " ";
      }

      console.log(logStatement);
    }

  }
};

processScreenshot();

setInterval(() => {
  processScreenshot();
}, 800);

