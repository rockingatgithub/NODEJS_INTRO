const path = require('path')
const express = require('express')
const PORT = 8000
const app = express()
let counter = 0

const requestCounter = (req, res, next) => {
    console.log("URL:", req.url)
    counter++
    console.log("Total request counter: ", counter)
    if(counter > 10) {
        return res.send("Too many request")
    }
    next()
}

app.use(requestCounter)

app.use(express.urlencoded())

app.get('/home', (req, res) => { return res.sendFile(path.join(__dirname, '/views/userForm.html'))  })

app.post('/createUser', (req, res) => { console.log(req.body); 
    return res.send("USer created successfully!")    
  })

app.get('/dotnet', async (req, res) => {

    const response = await fetch('http://localhost:9000/nodeRequest' )
    const parsedResponse = await response.json()
    return res.status(200).json(parsedResponse)

})

app.listen(PORT, () => {
    console.log("Server is running!")
})






















// const { readFileSync } = require('fs')
// const http = require('http')
// const path = require('path')
// const event = require('events').EventEmitter
// const PORT = 8000

// const server = http.createServer( (req, res) => { 

//     // console.log(req)

//     if(req.method === 'POST' && req.url === '/createUser') {

//         console.log(req.body)

//         return res.end("User created successfully")

//     } else if(req.url === '/about') {

//         res.setHeader("Set-Cookie", "user=codingNinjas")
//         return res.end('<h1> This is about page. </h1>')

//     }else if(req.url === '/home') {

//         const userForm = readFileSync(path.join(__dirname, '/views/userForm.html')).toString()

//         res.setHeader('Content-Type', "text/html")
//         return res.end(userForm)


//     }
//     else {
//         return res.end('<h1> This is sample response </h1>')
//     }



//  }  )


//  const eventObj = new event()

//  eventObj.on('custom-event', (data) => {
//     console.log("event received", data)
//  })

//  eventObj.on('custom-event', (data) => {
//     console.log("event received", data)
//  })

//  eventObj.emit( 'custom-event', [1,2,3] )


//  server.listen(PORT, () => { console.log("Server running!") })

