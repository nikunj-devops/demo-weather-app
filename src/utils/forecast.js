const request = require('request');

const forecast = (lat, lng, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=6bf8db4b50026642984bc1b4d33588b6&query='+lat+','+lng+'&units=f'
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to run API.'+ error, undefined)
        } else if (body.error) {
            callback('Unable to find data', undefined)
        } else {
            callback(
                undefined,
                'Its ' + body.current.temperature + ' degree out there and it feels like '+body.current.feelslike + ' degree out. There is wind speed of ' + body.current.wind_speed + 'miles per hour.'
            )
        }
    })
}

module.exports = forecast