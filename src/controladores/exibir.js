const { converterArquivo, encontrarUsuario } = require("./utils/utils")
const fs = require('fs/promises')

const exibirRegistros = async (req, res) => {
    let { id } = req.params
    id = Number(id)

    const entradas = await fs.readFile('./src/registros/entradas.json')
    const entradasArray = JSON.parse(entradas)
    const entradasUsuario = entradasArray.filter((entrada) => {
        return entrada.id === id
    })

    const saidas = await fs.readFile('./src/registros/saidas.json')
    const saidasArray = JSON.parse(saidas)
    const saidasUsuario = saidasArray.filter((saida) => {
        return saida.id === id
    })

    const registroUsuario = {
        entradas: entradasUsuario,
        saidas: saidasUsuario
    }

    return res.status(200).json(registroUsuario)
}

module.exports = exibirRegistros