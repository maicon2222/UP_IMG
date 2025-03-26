const express = require("express");
const router = express.Router();

const upload = require("../config/multer");

const PictureController = require("../controllers/PictureController");

// Definindo a rota POST para criar, e fazer upload da imagem
router.post("/", upload.single("file"), PictureController.create);

// Definindo a rota GET para buscar todas as imagens do DB
router.get("/", PictureController.findAll);

// Definindo a Rota DELETE para apagar imagens
router.delete(":id", PictureController.remove);

// Exportando o arquivo para utilizar no app.js
module.exports = router;
