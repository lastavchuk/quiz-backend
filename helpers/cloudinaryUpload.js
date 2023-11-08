const fs = require('fs/promises');
const cloudinary = require('../helpers/cloudinary');

async function cloudinaryUpload(path, folder) {
  const { url } = await cloudinary.uploader.upload(path, { folder });

  await fs.unlink(path);

  return url;
}

module.exports = cloudinaryUpload;
