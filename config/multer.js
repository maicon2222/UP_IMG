// importando multer, upload de arquivos

const multer = require("multer");

// importando o path para manipular as pastas (caminhos)
const path = require("path");

// MulterError, onde os arquivos serão salvos
const strorage = multer.diskStrorage({
    // Função que define o destino do arquivo

    descrition: function ( req, file, cb) {
        // O destino é a pasta uploas
        cb(null, "uploads/"); //null significa que não há erro
    },
    // Função que define o nome do arquivo para salvar
    filename: function(req, file, cb) {
        // Data + Estensao do arquivo
        cb(null, Date.now() + path.extname(file.originalmente));
    },
});

// middleware do multer
const upload = multer({ strorage });

// Exporta para utilizar em outro arquivo
module.exports = upload;