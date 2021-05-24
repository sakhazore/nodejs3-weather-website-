const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000

// Define paths for Express Config
const directoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views') 
const partialPath = path.join(__dirname, '../templates/partials')

// Setup handlebar Engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// Setup static directry to serve
app.use(express.static(directoryPath))

// 
app.get('', (req, res)=>{
    res.render('index',{
        title: 'Weather App!',
        name: 'Sakha '
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About Me!',
        name: 'Sakha'
    })
})

app.get('/help', (req, res)=>{
    res.render('help',{
        title: 'For Help use this No:22223333',
        email: 'sakha@gmail.com',
        name: "sakharam Zore"
    })
})
// app.get(express.static(HelpDir), (req, res)=>{
//     res.send('Help Page!')

// })

// app.get(express.static(AboutDir), (req, res) =>{
//     res.send('<h1>About</h1>')
// })

app.get('/weather', (req, res) =>{
    if(!req.query.address){
        return res.send({
            error: 'Country must be provise!'
        })
    }
    geocode(req.query.address, (error, { lattitude, longitude, location } = {}) =>{
        
        if(error){
            return res.send({ error })
        }

        forecast(lattitude, longitude, (error, forecastData) => {
            
            if(error){
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })

    })

    // console.log(req.query.address)

    // res.send({
    //     forecast: "Its a Snowing",
    //     location: "Philadelphia",
    //     address : req.query.address
    // })
})

app.get('/products', (req, res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide search product!'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })

})

// app.com
// app.com/help
// app.com/about

app.get('/help/*', (req,res)=>{
    res.render('404',{
        title: "404",
        name:"sakharam Zore",
        errorMessage:"Help article not Found!"
    })
})

app.get('*', (req, res)=>{
    res.render('404',{
        title:"404",
        name : 'sakharam Zore',
        errorMessage: 'page not Found!'

    })
})


app.listen(port, () =>{
    console.log('Server is up on port 3000.')
})