// importando multer, upload de arquivos
const multer = require("multer");

// Configuração do multer para salvar em memoria
const storage = multer.memoryStorage();

// Middleware do multer para upload da img.
const upload = multer ({
    storage, 
    limits: {
        fileSize: 5 * 1024 * 1024, //limite do SMD
    },
}); 

// Exporta para utilizar em outro arquivo
module.exports = upload;







// MulterError, onde os arquivos serão salvos
// const storage = multer.diskStorage({
//     Função que define o destino do arquivo

//     destination: function ( req, file, cb) {
//         O destino é a pasta uploas
//         cb(null, "uploads/"); //null significa que não há erro;
//     },
//     Função que define o nome do arquivo para salvar
//     filename: function(req, file, cb) {
//         Data + Estensao do arquivo
//         cb(null, Date.now() + path.extname(file.originalname));
//     },
// });

// middleware do multer
// const upload = multer({ storage });