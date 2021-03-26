const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { query } = require('express')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

// define paths for Express config
const publicDirPath = path.join(__dirname, '../public/')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicDirPath))

app.get('', function (req, res) {
    res.render('index', {
        title: "Weather App",
        name: "Nikunj"
    })
})

app.get('/about', function (req, res) {
    res.render('about', {
        title: "About page",
        name: "Nikunj"
    })
})

app.get('/help', function (req, res) {
    res.render('help', {
        title: "Help Page",
        helptext: "This is help text",
        name: "Nikunj"
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        message: "Help content not found",
        name: "Nikunj"
    })
})

app.get('/weather', (req, res) => {


    if (!req.query.address) {
        return res.send({
            error: "Please provide an address"
        })
    }


    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {            
            return res.send({
                error
            })
        }
        
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }
            
            return res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})


app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "Please provide a search term"
        })
    }

    res.send({
        products:{
            search: req.query.search
        }
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        message: "Page Not Found!!",
        name: "Nikunj"
    })
})

app.listen(3000, () => {
    console.log('Web server started at port 3000')
})