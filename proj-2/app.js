const net = require('net')
const server = net.createServer()

/*
listening to the new connection
clientToProxySocket: triggers an event "data"
*/ 
server.on('connection', (clientToProxySocket) => {
    console.log("client connected to the proxy");
})


// listen to the error event
server.on("error", err => {
    console.log("Some internal server error occured");
    console.error(err);
})

// listening to the close event
server.on('close', () => {
    console.log("Client disconnected");
})

server.listen({
    host: "0.0.0.0",
    port: 8080
}, () => {
    console.log("Server is running on 0.0.0.0:8080")
})