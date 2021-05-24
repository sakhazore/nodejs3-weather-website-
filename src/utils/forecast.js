const request = require('request')
// encodeURIComponent(address) 

const forecast = (lat,long, callback)=>{
    const url='http://api.weatherstack.com/current?access_key=1b8c1c735f52485c735204a5ed483295&query='+encodeURIComponent(lat)+','+ encodeURIComponent(long)
    
    request({url, json: true }, (error, {body})=>{
        
        if(error){
            callback('Unable to connect Location!', undefined)
        }else if(body.error){
            callback("Unable to find location , Try anothe search", undefined)
        }else{
            callback(undefined,body.current.weather_descriptions + ". Its is curerently "+body.current.temperature+" degree out. It feels like "+body.current.feelslike+" degree out.")
    }
    })

}
module.exports = forecast