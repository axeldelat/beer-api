const { request, response } = require('express')
const express = require('express')

const app = express()

app.use(express.json())

const port = 8080

let beers = [
    {
        id: 'abc123',
        marca: 'corona',
        tipo: 'pilsner',
        precio: 30
    },
    {
        id: 'abc124',
        marca: 'Heineken',
        tipo: 'lager',
        precio: 22
    },
    {
        id: 'abc125',
        marca: 'Bohemia',
        tipo: 'viena',
        precio: 25
    },
    {
        id: 'abc126',
        marca: 'Paulaner',
        tipo: 'lager',
        precio: 50
    }
]

app.use(getMethod)

app.get('/beers', (request, response) =>{
    response.json({
        succes: true,
        data: {
            beers: beers
        }
    })
})

app.get('/beers/:id', (request, response) => {
    const id = request.params.id
    getBeerById = beers.filter((beer) => {
        return beer.id === id
    })
    response.json({
        success: true,
        message: 'Selected Beer',
        data: {
            getBeerById
        }
    })
})

app.post('/beers', (request, response) =>{
    beers.push(request.body)
    response.json({
        succes: true,
        data: {
            beers: beers
        }
    })
})

app.patch('/beers/:id', (request, response) => {
    const id = request.params.id
    beers = beers.map((beer) => {
        if (beer.id === id ) {
        beer.marca = request.body.marca
        }
        return beer
    })
    response.json({
        success: true,
        message: 'Beer updated',
        data: {
            beers
        }
    })
})

app.delete('/beers/:id', (request, response) => {
    const id = request.params.id
    beers = beers.filter((beer) => {
        return beer.id !== id
    })
    response.json({
        success: true,
        message: 'beer deleted',
        data: {
            beers
        }
    })
})

function getMethod(request,response, next){
    console.log(`${request.method}: ${request.url}`)
    next()
}



app.listen(port, () => {
    console.log('Server is listening in port 8080')
})