const express = require('express')
const app = express()
const server = require('http').createServer(app)

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile("index")
})

const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
    console.log(`connected on ${PORT}`);
});

const io = require('socket.io')(server)

io.on('connection', (socket) => { 
    console.log('socket connected');
    socket.on('newMessage', (msg) => {
        socket.broadcast.emit('newMessage', msg)
    })
 });
