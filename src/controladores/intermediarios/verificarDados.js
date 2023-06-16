const { converterArquivo, encontrarUsuario } = require("../utils/utils")

const verificarUsuarioESenha = async (req, res, next) => {
    let { id, senha } = req.query
    id = Number(id)

    if (!id) {
        return res.status(400).json({
            'Mensagem': 'O ID do usuario deve ser informado!'
        })
    }

    if (!senha) {
        return res.status(400).json({
            'Mensagem': 'A senha deve ser informada!'
        })
    }

    const usuarios = await converterArquivo()

    const usuarioSolicitado = encontrarUsuario(usuarios, id)

    if (!usuarioSolicitado) {
        return res.status(404).json({
            'Mensagem': 'O usuario solicitado não foi encontrado!'
        })
    }

    if (usuarioSolicitado.senha !== senha) {
        return res.status(400).json({
            'Mensagem': 'A senha informada está incorreta!'
        })
    }

    next()
}

const verificarDadosCadastro = (req, res, next) => {
    const { nome, cpf, data_nascimento, senha } = req.body

    if (!nome) {
        return res.status(400).json({
            'Mensagem': 'O nome deve ser informado!'
        })
    }

    if (!cpf) {
        return res.status(400).json({
            'Mensagem': 'O cpf deve ser informado!'
        })
    }

    if (!data_nascimento) {
        return res.status(400).json({
            'Mensagem': 'A data de nascimento deve ser informada!'
        })
    }

    if (!senha) {
        return res.status(400).json({
            'Mensagem': 'A senha deve ser informada!'
        })
    }

    next()
}

module.exports = { verificarUsuarioESenha, verificarDadosCadastro }