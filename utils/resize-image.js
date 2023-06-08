const sharp = require('sharp');

const resizeImage = async (sourcePath, destPath) => {
  try {
    await sharp(sourcePath)
      .resize({
        width: 1000,
        // height: 97,
      })
      .rotate(-90)
      .toFile(destPath);
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  resizeImage,
};
