// Importando multer, upload de arquivos
const multer = require("multer");

// Importando o path para manipular as pastas (Caminhos)
const path = require("path");

// Multer, onde os arquivos serão salvaos
const storage = multer.diskStorage({
  // Função que define o destino do arquivo
  destination: function (req, file, cb) {
    // O destino é a pasta Uploads.
    cb(null, "uploads/"); // null significa que não há erro
  },
  // Função que define o nome do arquivo para salvar
  filename: function (req, file, cb) {
    // Data + Extensão do arquivo
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Middleware do Multer
const upload = multer({ storage });

// Exporta para utilizar em outro arquivo
module.exports = upload;
