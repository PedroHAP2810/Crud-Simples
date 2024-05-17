// imports
const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')

//configurações
const PORT = 3000
const app = express()

// conexão com o banco
const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS
const DB_HOST = process.env.DB_HOST
const DB_NAME = process.env.DB_NAME

mongoose.connect(`mongodb+srv://PedroHAP:zh9XkK1mwkodsA5j@pedrohap.zinlqt3.mongodb.net/?retryWrites=true&w=majority&appName=PedroHAP`)
    .then(() => console.log("Conectado ao banco Mongo!"))
    .catch(err => console.log("Erro ao conectar ao banco Mongo: ", err))

// middlewares
app.use(express.json())

// models
const Pessoa = mongoose.model('Pessoas', { nome: String })

// rotas
app.post('/pessoas', async (req, res) => {
    const pessoa = new Pessoa(req.body)
    const pessoaCriada = await Pessoa.save()
    res.status(201).json(pessoaCriada)
})

app.get('/pessoa', async (req, res) => {
    const pessoas = await Pessoa.find()
    res.json(pessoas)
})

app.get('/pessoas/:id', async (req, res) => {
    const pessoa = await Pessoa.findById(req.params.id)
    res.json(pessoa)
})

app.delete('/pessoas/:id', async (req, res) => {
    await Pessoa.findByIdAndDelete(req.params.id)
    res.json({ mensagem: "Pessoa excluida com sucesso!" })
})

app.put('/pessoas/:id', async (req, res) => {
    const pessoaAtualizada = await Pessoa.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(pessoaAtualizada)
})

// start
app.listen(PORT, () => {
    console.log(`Aplicação rodando na porta ${PORT}`)
})