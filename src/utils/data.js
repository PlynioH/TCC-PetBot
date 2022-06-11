const moment = require('moment')

class Data{

    diasNoMesAtual(){
        return this.diasNoMes(new Date().getMonth() + 1, new Date().getFullYear())
    }

    diasNoMes(mes, ano) {
        const data = new Date(ano, mes, 0)
        return data.getDate()
    }

    diaDaSemana(dia) {
        const semana = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"]
        return semana[dia];
    }

    devolverDiasHorariosLivres(eventos) {
        const diasNoMes = this.diasNoMesAtual()
        const dataAtual = moment(new Date())
        const livres = []
        for (let index = 1; index <= diasNoMes; index++) {
            if(index >= parseInt(dataAtual.format('D'))){
                const diadasemana = this.diaDaSemana(new Date(`${dataAtual.format('Y')}-${dataAtual.format('M')}-${index}`).getDay())
                if(diadasemana != "Domingo" && diadasemana != "Sábado"){
                    var eventt = false
                    var dia = moment(`${dataAtual.format('Y')}-${dataAtual.format('M')}-${index} 08:00`)
                    eventos.map((event, i) => {
                        const start = moment(event.start.dateTime || event.start.date)
                        const end = moment(event.end.dateTime || event.end.date)
                        if(parseInt(start.format('D')) == index)
                        {
                            eventt = true
                            for (let index = 0; index < 9; index++) {
                                if(start.format('h') != dia.format('h')){
                                    if(dia.format('h') == 12){
                                        dia.hour(13)
                                        dia.minute(30)
                                    }
                                    livres.push(`${dia}`)
                                }
                                dia.add(1, 'h')
                            }

                        }
                    })
                    if(!eventt){
                        for (let index = 0; index < 9; index++) {
                            if(dia.format('h') == 12){
                                dia.hour(13)
                                dia.minute(30)
                            }
                            livres.push(`${dia}`)
                            dia.add(1, 'h')
                        }
                    }
                }
            }
        }
        return livres
    }

}

module.exports = { Data }