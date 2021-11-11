const {PeerServer} = require('peer');
const {v4: uuidv4} = require('uuid');
const fs = require('fs');
const Turn = require('node-turn');

const options = {
    port: process.env.PEER_PORT,
    path: process.env.PEER_PATH,
    generateClientId: uuidv4
}

if (process.env.APP_MODE === 'prod') {
    options.ssl = {
        key: fs.readFileSync(process.env.SSL_KEY),
        cert: fs.readFileSync(process.env.SSL_CERTIFICATE)
    }
}
console.log('options', options)

const peerServer = PeerServer(options, () => {
    console.log(`server started with port: ${process.env.PEER_PORT}`)
});

peerServer.on('connection', (client) => {
    console.log('connection', client.getId())
});

peerServer.on('disconnect', (client) => {
    console.log('disconnect', client.getId())
});

peerServer.on('message', client => {
    console.log('message', client)
})


const server = new Turn({
    // set options
    listeningPort: process.env.TURN_PROT,
    authMech: 'none',
    credentials: {
        username: process.env.TURN_CREDETINALS
    },
    debugLevel: 'all',
    debug: (e, string) => {
        console.log('debug', string)
    }
});
server.start();