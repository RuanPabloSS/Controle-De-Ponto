const { converterArquivo, encontrarIndice, encontrarUsuario, formatarData } = require("./utils/utils")
const fs = require('fs/promises')

const iniciarRegistro = async (req, res) => {
    const { senha } = req.query
    let { id } = req.params
    id = Number(id)

    const usuarios = await converterArquivo()

    const usuarioSolicitado = encontrarUsuario(usuarios, id)

    if (usuarioSolicitado.status) {
        return res.status(400).json({
            'Mensagem': 'O usuario solicitado já está em serviço!'
        })
    }

    const index = encontrarIndice(usuarios, id)

    const { nome, cpf, data_nascimento } = usuarioSolicitado

    const usuarioEmServico = {
        id,
        nome,
        cpf,
        data_nascimento,
        senha,
        status: true
    }

    usuarios.splice(index, 1, usuarioEmServico)

    const stringUsuarios = JSON.stringify(usuarios)
    await fs.writeFile('./src/usuarios.json', stringUsuarios)

    const entradas = await fs.readFile('./src/registros/entradas.json')
    const entradasArray = JSON.parse(entradas)

    const dataFormatada = formatarData()

    const registroEntrada = {
        usuario: usuarioSolicitado.nome,
        id,
        hora_entrada: dataFormatada,
    }

    entradasArray.push(registroEntrada)

    const registroString = JSON.stringify(entradasArray)
    await fs.writeFile('./src/registros/entradas.json', registroString)

    return res.status(200).json({
        'Mensagem': 'Registro iniciado!'
    })
}

module.exports = iniciarRegistro