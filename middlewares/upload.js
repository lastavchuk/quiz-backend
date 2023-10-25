const multer = require("multer");
const path = require("path");

const multerConfig = multer.diskStorage({
    destination: path.join(__dirname, "../", "temp"),

    // якщо потрібно перейменувати файл
    // filename: (req, file, cb) => {
    //     cb(null, file.originalname);
    // },
});

const upload = multer({
    storage: multerConfig,
});

module.exports = upload;
