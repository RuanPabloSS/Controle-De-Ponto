const { converterArquivo, existeCpf } = require("./utils/utils")
const fs = require('fs/promises')

const criarUsuario = async (req, res) => {
    const { nome, cpf, data_nascimento, senha } = req.body

    const usuarios = await converterArquivo()

    const cpfJaExiste = existeCpf(usuarios, cpf)

    if (cpfJaExiste) {
        return res.status(400).json({
            'Mensagem': 'O cpf informado já está cadastrado!'
        })
    }

    let id = await fs.readFile('./src/controladores/contador.txt')
    id = Number(id)

    const novoUsuario = {
        id,
        nome,
        cpf,
        data_nascimento,
        senha,
        status: false
    }

    id++
    const idString = JSON.stringify(id)
    await fs.writeFile('./src/controladores/contador.txt', idString)

    usuarios.push(novoUsuario)

    const stringUsuarios = JSON.stringify(usuarios)
    await fs.writeFile('./src/usuarios.json', stringUsuarios)

    return res.status(201).json(novoUsuario)
}

module.exports = criarUsuario