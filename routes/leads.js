
const express = require('express');
const router = express.Router();
const conexao = require('../conexao');

router.get('/', async (req, res) => {
    try {
        const [leads] = await conexao.query(
            'SELECT * FROM leads ORDER BY id DESC'
        );

        res.json(leads);
    } catch (erro) {
        res.status(500).json({
            mensagem: 'Erro ao buscar leads',
            erro: erro.message
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const [leads] = await conexao.query(
            'SELECT * FROM leads WHERE id = ?',
            [req.params.id]
        );

        if (leads.length === 0) {
            return res.status(404).json({
                mensagem: 'Lead não encontrado'
            });
        }

        res.json(leads[0]);
    } catch (erro) {
        res.status(500).json({
            mensagem: 'Erro ao buscar lead',
            erro: erro.message
        });
    }
});

router.post('/', async (req, res) => {
    try {
        const {
            nome,
            telefone,
            email,
            status,
            ativo,
            comprou_pacote
        } = req.body;

        if (!nome || !telefone) {
            return res.status(400).json({
                mensagem: 'Nome e telefone são obrigatórios'
            });
        }

        const [resultado] = await conexao.query(
            `INSERT INTO leads
            (nome, telefone, email, status, ativo, comprou_pacote)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [
                nome,
                telefone,
                email || null,
                status || 'Lead Novo',
                ativo === undefined ? 1 : Number(ativo),
                comprou_pacote === undefined ? 0 : Number(comprou_pacote)
            ]
        );

        res.status(201).json({
            mensagem: 'Lead cadastrado com sucesso!',
            id: resultado.insertId
        });
    } catch (erro) {
        res.status(500).json({
            mensagem: 'Erro ao cadastrar lead',
            erro: erro.message
        });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const {
            nome,
            telefone,
            email,
            status,
            ativo,
            comprou_pacote
        } = req.body;

        if (!nome || !telefone) {
            return res.status(400).json({
                mensagem: 'Nome e telefone são obrigatórios'
            });
        }

        const [resultado] = await conexao.query(
            `UPDATE leads SET
                nome = ?,
                telefone = ?,
                email = ?,
                status = ?,
                ativo = ?,
                comprou_pacote = ?
            WHERE id = ?`,
            [
                nome,
                telefone,
                email || null,
                status || 'Lead Novo',
                Number(ativo),
                Number(comprou_pacote),
                req.params.id
            ]
        );

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                mensagem: 'Lead não encontrado'
            });
        }

        res.json({
            mensagem: 'Lead atualizado com sucesso!'
        });
    } catch (erro) {
        res.status(500).json({
            mensagem: 'Erro ao atualizar lead',
            erro: erro.message
        });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const [resultado] = await conexao.query(
            'DELETE FROM leads WHERE id = ?',
            [req.params.id]
        );

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                mensagem: 'Lead não encontrado'
            });
        }

        res.json({
            mensagem: 'Lead excluído com sucesso!'
        });
    } catch (erro) {
        res.status(500).json({
            mensagem: 'Erro ao excluir lead',
            erro: erro.message
        });
    }
});

module.exports = router;
