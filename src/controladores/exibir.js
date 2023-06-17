const { obterEntradas, obterSaidas, encontrarUsuario, converterArquivo } = require("./utils/utils")
const { intervalToDuration } = require('date-fns')

const exibirRegistros = async (req, res) => {
    let { id } = req.params
    id = Number(id)

    const entradas = await obterEntradas(id)

    const saidas = await obterSaidas(id)

    const registroUsuario = {
        entradas,
        saidas
    }

    return res.status(200).json(registroUsuario)
}

const exibirHorasTrabalhadas = async (req, res) => {
    let { id } = req.params
    id = Number(id)

    const entradas = await obterEntradas(id)
    const saidas = await obterSaidas(id)
    const horasTrabalhadas = []

    if (entradas.length > saidas.length) {
        return res.status(400).json({
            'Mensagem': 'O usuario solicitado ainda está em serviço!'
        })
    }

    for (let i = 0; i < entradas.length; i++) {

        let { hora_entrada } = entradas[i]
        let { hora_saida } = saidas[i]

        hora_entrada = hora_entrada.split(' ')
        hora_saida = hora_saida.split(' ')

        let dataInicial = hora_entrada[0]
        dataInicial = dataInicial.split('.')

        let dataFinal = hora_saida[0]
        dataFinal = dataFinal.split('.')

        let horaInicial = hora_entrada[1]
        horaInicial = horaInicial.split(':')

        let horaFinal = hora_saida[1]
        horaFinal = horaFinal.split(':')

        const anoInicial = dataInicial[2]
        const anoFinal = dataFinal[2]

        let mesInicial = Number(dataInicial[1]) - 1
        mesInicial = mesInicial.toString()

        let mesFinal = Number(dataFinal[1]) - 1
        mesFinal = mesFinal.toString()

        const diaInicial = dataInicial[0]
        const diaFinal = dataFinal[0]

        const horaDeInicio = horaInicial[0]
        const horaDeTermino = horaFinal[0]

        const minutosDeInicio = horaInicial[1]
        const minutosDeTermino = horaFinal[1]

        const segDeInicio = horaInicial[2]
        const segDeTermino = horaFinal[2]

        const intervalo = intervalToDuration({
            start: new Date(anoInicial, mesInicial, diaInicial, horaDeInicio, minutosDeInicio, segDeInicio),
            end: new Date(anoFinal, mesFinal, diaFinal, horaDeTermino, minutosDeTermino, segDeTermino)
        })

        horasTrabalhadas.push(intervalo)
    }

    let horas = 0
    let minutos = 0

    for (let intervalo of horasTrabalhadas) {
        horas += intervalo.hours
        minutos += intervalo.minutes
    }

    return res.status(200).json({
        'Mensagem': `Horas trabalhadas: ${horas} horas e ${minutos} minutos!`
    })

}

module.exports = { exibirRegistros, exibirHorasTrabalhadas }