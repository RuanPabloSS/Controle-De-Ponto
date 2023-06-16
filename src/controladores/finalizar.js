const { converterArquivo, encontrarUsuario, encontrarIndice, formatarData } = require("./utils/utils")
const fs = require('fs/promises')

const finalizarRegistro = async (req, res) => {
    let { id, senha } = req.query
    id = Number(id)

    const usuarios = await converterArquivo()

    const usuarioSolicitado = encontrarUsuario(usuarios, id)

    if (!usuarioSolicitado.status) {
        return res.status(400).json({
            'Mensagem': 'O usuario solicitado não está em serviço!'
        })
    }

    const index = encontrarIndice(usuarios, id)

    const { nome, cpf, data_nascimento } = usuarioSolicitado

    const usuarioForaDeServico = {
        id,
        nome,
        cpf,
        data_nascimento,
        senha,
        status: false
    }

    usuarios.splice(index, 1, usuarioForaDeServico)

    const stringUsuarios = JSON.stringify(usuarios)
    await fs.writeFile('./src/usuarios.json', stringUsuarios)

    const saidas = await fs.readFile('./src/registros/saidas.json')
    const saidasArray = JSON.parse(saidas)

    const dataFormatada = formatarData()

    const registroSaida = {
        usuario: usuarioSolicitado.nome,
        id,
        hora_saida: dataFormatada
    }

    saidasArray.push(registroSaida)

    const registroString = JSON.stringify(saidasArray)
    await fs.writeFile('./src/registros/saidas.json', registroString)

    return res.status(200).json({
        'Mensagem': 'Registro finalizado!'
    })
}

module.exports = finalizarRegistro