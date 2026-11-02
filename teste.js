const conexao = require('./conexao');

async function testar() {
    try {
        const [resultado] = await conexao.query(
            'SELECT * FROM leads'
        );

        console.log('Leads encontrados:');
        console.table(resultado);

    } catch (erro) {
        console.log('Erro:', erro.message);

    } finally {
        await conexao.end();
    }
}

testar();