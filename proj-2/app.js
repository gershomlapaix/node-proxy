const net = require('net')
const server = net.createServer()

/*
listening to the new connection
clientToProxySocket: triggers an event "data"
*/
server.on('connection', (clientToProxySocket) => {
    console.log("client connected to the proxy");
    clientToProxySocket.once('data', data => {

        // checking if the connection is http or https

        let isTLSConnection = data.toString().indexOf('CONNECT') !== -1

        let serverPort = 443
        let serverAddress;

        if (isTLSConnection) {
            serverPort = 443

            serverAddress = data.toString().split("CONNECT")[1].split(" ")[1].split(':')[0]
            console.log("output");
            console.log(data.toString().split("CONNECT")[1], data.toString().split("CONNECT")[1].split(" ")[1], data.toString().split("CONNECT")[1].split(" ")[1].split(':')[0])

        } else {
            // if it is not HTTPS, the port is now 80
            serverAddress = data.toString().split("Host: ")[1].split("\n")[0]
        }

        // creating a connection from proxy to destination server
        let proxyToServer = net.createConnection({
            host: serverAddress,
            port: serverPort
        }, () => {
            console.log("Proxy to server set up")
        })

        if (isTLSConnection) {
            clientToProxySocket.write('HTTP/1.1 200 OK\r\n\n')
        } else {
            proxyToServer.write(data)
        }

        clientToProxySocket.pipe(proxyToServer)
        proxyToServer.pipe(clientToProxySocket)

        proxyToServer.on('error', err => {
            console.log("proxy to server error : " + err);
        })

        clientToProxySocket.on('error', err => {
            console.log("Client to proxy error");
        })
    })
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