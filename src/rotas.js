const express = require('express')
const { verificarUsuarioESenha, verificarDadosCadastro } = require('./controladores/intermediarios/verificarDados')
const iniciarRegistro = require('./controladores/iniciar')
const criarUsuario = require('./controladores/criar')

const rotas = express.Router()

rotas.get('/iniciar', verificarUsuarioESenha, iniciarRegistro)
rotas.post('/criar', verificarDadosCadastro, criarUsuario)

module.exports = rotas