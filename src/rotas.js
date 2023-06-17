const express = require('express')
const { verificarUsuarioESenha, verificarDadosCadastro } = require('./controladores/intermediarios/verificarDados')
const iniciarRegistro = require('./controladores/iniciar')
const criarUsuario = require('./controladores/criar')
const finalizarRegistro = require('./controladores/finalizar')
const { exibirRegistros, exibirHorasTrabalhadas } = require('./controladores/exibir')
const deletarUsuario = require('./controladores/deletar')

const rotas = express.Router()

rotas.post('/criar', verificarDadosCadastro, criarUsuario)
rotas.put('/iniciar/:id', verificarUsuarioESenha, iniciarRegistro)
rotas.put('/parar/:id', verificarUsuarioESenha, finalizarRegistro)
rotas.get('/registros/:id', verificarUsuarioESenha, exibirRegistros)
rotas.get('/horasTrabalhadas/:id', verificarUsuarioESenha, exibirHorasTrabalhadas)
rotas.delete('/deletar/:id', verificarUsuarioESenha, deletarUsuario)

module.exports = rotas