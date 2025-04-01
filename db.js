// Importa para interagir com o DB
const mongoose = require("mongoose");

// Carrega variaáveis de ambiente do arquivo ENV.
require("dotenv").config();

// Configurando para permitir consultas (restritas)
mongoose.set("StrictQuery", true);
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;
const mongoURI = `mongodb+srv://${dbUser}:${dbPassword}@webapi.gfh5u.mongodb.net/?retryWrites=true&w=majority&appName=WebAPI`;


// Função para o DB
async function main() {
    await mongoose.connect(mongoURI);
    // link do mongo 

    // Exibe ao usuario que realizou a conexão
    console.log("Conectou ao banco de dados!");
}
// Exibe  mensagem ao usuário com erro
main().catch((err) => console.log(err));

// Exporta a função para utilizar em outro arquivo
module.exports = main;



