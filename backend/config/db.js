require("dotenv").config();
const mongoose = require("mongoose");

// Variáveis de ambiente
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;

// Função de conexão
const conn = async () => {
    try {
    await mongoose.connect(
        `mongodb+srv://${dbUser}:${dbPassword}@${dbName}.nizlq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    );

    console.log("Conectado ao MongoDB Atlas!");

    return conn;
    } catch (error) {
        console.error("Erro ao conectar ao MongoDB Atlas:", error.message);
        process.exit(1); // Encerra o processo em caso de erro
    }
};

// Executa a conexão
conn();

module.exports = conn;
