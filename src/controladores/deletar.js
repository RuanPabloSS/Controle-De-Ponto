const { converterArquivo, encontrarIndice } = require("./utils/utils")
const fs = require('fs/promises')

const deletarUsuario = async (req, res) => {
    let { id } = req.params
    id = Number(id)

    const usuarios = await converterArquivo()

    const index = encontrarIndice(usuarios, id)

    usuarios.splice(index, 1)

    const usuariosString = JSON.stringify(usuarios)
    await fs.writeFile('./src/usuarios.json', usuariosString)

    return res.status(200).json({
        'Mensagem': 'O usuario foi deletado com sucesso!'
    })
}

module.exports = deletarUsuario