const { PeerServer } = require('peer');
const { v4: uuidv4 }  = require('uuid');

const peerServer = PeerServer({
    port: process.env.PEER_PORT,
    path: process.env.PEER_PATH,
    generateClientId: uuidv4
}, () => {
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