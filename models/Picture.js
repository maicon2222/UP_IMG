// Importa para interação com o DB
const mongoose = require("mongoose");

// Permite criar esquemas e modelos para o mongoDB
const Schema = mongoose.Schema;

// Definindo um Schema para as Imagens
const PictureSchema = new Schema({
  // Campo de tipo string e obrigatório
  name: { type: String, required: true },
  // Armazenar a imagem como Buffer "salva temporario"
  imagem: { type: Buffer, required: true },
  // Campo armazenar o tipo da imagem
  contentType: { type: String, required: true },
});

// Criando o modelo 'picture' a partir do esquema criado antes
// modelo 'Picture' é usado para interagir com a "tabela" Picture no DB
module.exports = mongoose.model("Picture", PictureSchema);
