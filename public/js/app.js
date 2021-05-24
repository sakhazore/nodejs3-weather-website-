// const { response } = require("express")


// console.log("Client side javascript file is loaded!")

// fetch('http://puzzle.mead.io/puzzle').then((response) =>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#msg-1')
const message2 = document.querySelector('#msg-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    
    message1.textContent = "loading.."
    message2.textContent = ''

    fetch('http://localhost:3000/weather?address='+search.value).then((response) =>{
    response.json().then((data)=>{
        if(data.error){
            message1.textContent = data.error
            console.log(data.error)
        }else{
            message1.textContent = data.location
            message2.textContent = data.forecast
            console.log(data.forecast)
            console.log(data.location)
        }
        
    })
})
    
})
