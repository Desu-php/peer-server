const { PeerServer } = require('peer');
const { v4: uuidv4 }  = require('uuid');

const peerServer = PeerServer({
    port: 9000,
    path: '/myapp',
    generateClientId: uuidv4
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