
const express = require('express');
const cors = require('cors');
const path = require('path');
const conexao = require('./conexao');

const app = express();

app.use(cors());
app.use(express.json());


app.use(express.static(path.join(__dirname, 'public')));

app.get('/api', (req, res) => {
    res.json({
        mensagem: 'API da Clínica funcionando!'
    });
});

app.use('/leads', require('./routes/leads'));

const PORTA = 3000;

async function iniciarServidor() {
    try {
        const conexaoTeste = await conexao.getConnection();

        console.log('MySQL conectado com sucesso!');

        conexaoTeste.release();

        app.listen(PORTA, () => {
            console.log(`Servidor rodando em http://localhost:${PORTA}`);
        });

    } catch (erro) {
        console.log('Erro ao conectar com MySQL:', erro.message);
    }
}

iniciarServidor();