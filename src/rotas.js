const express = require('express')
const { verificarUsuarioESenha, verificarDadosCadastro } = require('./controladores/intermediarios/verificarDados')
const iniciarRegistro = require('./controladores/iniciar')
const criarUsuario = require('./controladores/criar')
const finalizarRegistro = require('./controladores/finalizar')

const rotas = express.Router()

rotas.put('/iniciar', verificarUsuarioESenha, iniciarRegistro)
rotas.post('/criar', verificarDadosCadastro, criarUsuario)
rotas.put('/parar', verificarUsuarioESenha, finalizarRegistro)

module.exports = rotas