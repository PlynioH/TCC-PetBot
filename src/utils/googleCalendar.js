const { google } = require('googleapis')
const { OAuth2 } = google.auth
require('dotenv').config()

class GoogleCalendar {
    
    constructor(){
        const oAuth2Client = new OAuth2(process.env.googleClienteId, process.env.googleChaveSecreta)
        oAuth2Client.setCredentials({refresh_token: process.env.googleRefreshToken})
        this._calendar = google.calendar({version: 'v3', auth: oAuth2Client})
    }

    pegarEventos(){
        return this._calendar.events.list({
            calendarId: 'primary',
            timeMin: (new Date()).toISOString(),
            singleEvents: true,
            orderBy: 'startTime',
            timeMax: (new Date('2022-06-30')).toISOString(),
        })
    }

    async cadastrarEventos(start, end, nomePet, descricao){

        const event = {
            summary: `Consulta pet: ${nomePet}`,
            location: 'tururu 123',
            description: `${descricao}`,
            start: {
                dateTime: start,
                timeZone: 'America/Sao_Paulo',
            },
            end: {
                dateTime: end,
                timeZone: 'America/Sao_Paulo',
            },
            colorId: 3,
        }

        this._calendar.freebusy.query(
            {
                resource: {
                    timeMin: start,
                    timeMax: end,
                    timeZone: 'America/Sao_Paulo',
                    items: [{id: 'primary'}],
                },
            },
            (err, res) => {
                if (err) return console.error('Free Busy Query Error: ', err)

                const eventsArr = res.data.calendars.primary.busy

                if(eventsArr.length === 0) return this._calendar.events.insert(
                    {calendarId: 'primary', resource: event},
                    err => {
                        if(err) return console.error('Calendar Event Creation Error: ', err)

                        return console.log('Calendar Event Created.')
                    }
                )
                return console.log("Sorry I'm Busy")
            }
        )
    }

}

module.exports = { GoogleCalendar }