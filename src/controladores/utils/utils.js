const fs = require('fs/promises')
const { utcToZonedTime, format } = require('date-fns-tz')

const converterArquivo = async () => {
    const usuariosString = await fs.readFile('./src/usuarios.json')

    const usuarios = JSON.parse(usuariosString)

    return usuarios
}

const encontrarUsuario = (usuarios, id) => {
    const usuarioSolicitado = usuarios.find((usuario) => {
        return usuario.id === id
    })

    return usuarioSolicitado
}

const encontrarIndice = (usuarios, id) => {
    const index = usuarios.findIndex((usuario) => {
        return usuario.id === id
    })

    return index
}

const existeCpf = (usuarios, cpf) => {
    const existeCpf = usuarios.find((usuario) => {
        return usuario.cpf === cpf
    })

    return existeCpf
}

const formatarData = () => {
    const data = new Date()
    const fuso = 'America/Sao_Paulo'
    const dataConvertida = utcToZonedTime(data, fuso)
    const padrao = 'dd.MM.yyyy HH:mm:ss'
    const dataFormatada = format(dataConvertida, padrao, { fuso: 'America/Sao_Paulo' })

    return dataFormatada
}

const obterEntradas = async (id) => {
    const entradas = await fs.readFile('./src/registros/entradas.json')
    const entradasArray = JSON.parse(entradas)
    const entradasUsuario = entradasArray.filter((entrada) => {
        return entrada.id === id
    })

    return entradasUsuario
}

const obterSaidas = async (id) => {
    const saidas = await fs.readFile('./src/registros/saidas.json')
    const saidasArray = JSON.parse(saidas)
    const saidasUsuario = saidasArray.filter((saida) => {
        return saida.id === id
    })

    return saidasUsuario
}

module.exports = { converterArquivo, encontrarUsuario, encontrarIndice, existeCpf, formatarData, obterEntradas, obterSaidas }