const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Definindo um Schema para as Imagens
const PictureSchema = new Schema({
  name: { type: String, required: true },
  src: { type: String, required: true },
});

// Exportando para utilizar em outros arquvos
module.exports = mongoose.model("Picture", PictureSchema);
