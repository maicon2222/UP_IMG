// Importa para interação com o DB
const mongoose = require("mongoose");

// Permite criar esquemas e modelos para o mongoDB
const Schema = mongoose.Schema;

// Definindo um Schema para as Imagens
const PictureSchema = new Schema({
  // Campo de tipo string e obrigatório
  name: { type: String, required: true },
  // Campo do típo String e obrigatório
  src: { type: String, required: true },
});

// Criando o modelo 'picture' a partir do esquema criado antes
// modelo 'Picture' é usado para interagir com a "tabela" Picture no DB
module.exports = mongoose.model("Picture", PictureSchema);
