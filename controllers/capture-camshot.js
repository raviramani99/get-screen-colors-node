import Webcam from "node-webcam";

const webcam = Webcam.create();

const createCamshot = () => {
  return new Promise((resolve, reject) => {
    webcam.capture("screenshot.jpg", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const captureCamshot = async () => {
  try {
    await createCamshot();
    console.log("Screenshot captured and saved as 'screenshot.jpg'");
  } catch (error) {
    console.error("Error:", error);
  }
};

export { captureCamshot };
