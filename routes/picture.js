// Importa o módulo do Express para configurar as Rotas
const express = require("express");

// Cria a instância do roteador do express para definir ROTAS
const router = express.Router();

// Importa a configuração do Multer para lidar com uploads de arquivos
const upload = require("../config/multer");

// Importa o controlador da IMG, onde todas as funções e busca 
const PictureController = require("../controllers/Picturecontroller");

// Definindo a rota POST para criar, e fazer upload da imagem
router.post("/", upload.single("file"), PictureController.create);

// Definindo a rota GET para buscar todas as imagens do DB
router.get("/", PictureController.findAll);

// Definindo a rota GET para obter uma imag. especifica 
router.get("/:id/image", PictureController.getImage);

// Definindo a Rota DELETE para apagar imagens
router.delete("/:id", PictureController.remove); // Corrigido para incluir a barra antes de :id

// Definindo a rota GET de foto especifica
router.get("/:id/imagem",PictureController.getImage)
 
// Definindo a rota put 
// router.put("/:id", upload.single("file"), PictureController.update);


// Exportando o arquivo para utilizar no app.js
module.exports = router;
