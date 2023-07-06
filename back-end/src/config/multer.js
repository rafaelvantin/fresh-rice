const multer = require('multer');
const crypto = require('crypto');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/')
    },
    filename: function (req, file, cb) {
        
        const extensaoArquivo = file.originalname.split('.')[1];

        const novoNomeArquivo = crypto
            .randomBytes(64)
            .toString('hex');

        cb(null, `${novoNomeArquivo}.${extensaoArquivo}`);
    }
});

module.exports = multer({ storage });