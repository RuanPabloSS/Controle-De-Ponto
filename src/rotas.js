const express = require('express')
const { verificarUsuarioESenha, verificarDadosCadastro } = require('./controladores/intermediarios/verificarDados')
const iniciarRegistro = require('./controladores/iniciar')
const criarUsuario = require('./controladores/criar')
const finalizarRegistro = require('./controladores/finalizar')
const exibirRegistros = require('./controladores/exibir')

const rotas = express.Router()

rotas.put('/iniciar/:id', verificarUsuarioESenha, iniciarRegistro)
rotas.post('/criar', verificarDadosCadastro, criarUsuario)
rotas.put('/parar/:id', verificarUsuarioESenha, finalizarRegistro)
rotas.get('/registros/:id', verificarUsuarioESenha, exibirRegistros)

module.exports = rotas