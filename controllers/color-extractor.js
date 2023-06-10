import screenshot from "screenshot-desktop";
import Vibrant from "node-vibrant";
import sharp from "sharp";

const extractColors = async (imageBuffer) => {
    try {
        // Create a Vibrant instance from the image buffer
        const vibrant = new Vibrant(imageBuffer);

        // Extract the color data from the image
        const swatches = await vibrant.getPalette();

        return swatches;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
};

const getMajorColor = (swatches) => {
    let maxPopulation = 0;
    let majorColor = null;

    // Iterate through the swatches
    for (const swatch of Object.values(swatches)) {
        // Check if the swatch population is higher than the current max
        if (swatch && swatch.population > maxPopulation) {
            maxPopulation = swatch.population;
            majorColor = swatch.getHex();
        }
    }

    return majorColor;
};

const divideScreenshot = async (rows, columns) => {
    try {
        // Capture the screenshot as an image buffer
        const imageBuffer = await screenshot();

        // Extract the image dimensions using sharp
        const { width, height } = await sharp(imageBuffer).metadata();

        const sectionWidth = Math.floor(width / columns);
        const sectionHeight = Math.floor(height / rows);

        const colorsMatrix = [];

        // Iterate through rows and columns
        for (let i = 0; i < rows; i++) {
            const rowColors = [];

            for (let j = 0; j < columns; j++) {
                const left = j * sectionWidth;
                const top = i * sectionHeight;
                const right = left + sectionWidth;
                const bottom = top + sectionHeight;

                // Extract the color for the section
                const sectionColor = await extractSectionColor(imageBuffer, left, top, right, bottom);
                rowColors.push(sectionColor);
            }

            colorsMatrix.push(rowColors);
        }

        return colorsMatrix;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
};

const extractSectionColor = async (imageBuffer, left, top, right, bottom) => {
    const sectionBuffer = await sharp(imageBuffer)
        .extract({ left, top, width: right - left, height: bottom - top })
        .toBuffer();

    const vibrant = new Vibrant(sectionBuffer);
    const swatches = await vibrant.getPalette();

    // Get the major color for the section
    const sectionMajorColor = getMajorColor(swatches);

    return sectionMajorColor;
};

export { extractColors, getMajorColor, divideScreenshot };
