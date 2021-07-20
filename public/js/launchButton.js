const launchButton = document.querySelector('#launch');
//const axios = require('axios');
// Create WebSocket connection.
const socket = new WebSocket('ws://peaceful-stream-94197.herokuapp.com', "echo-protocol");

console.log("helllo");
launchButton.addEventListener('click', launch);

function launch () {
    socket.send('launch');
}

// Connection opened
socket.addEventListener('open', function (event) {
    socket.send('Hello Server!');
});

// Listen for messages
socket.addEventListener('message', function (event) {
    console.log('Message from server ', event.data);
});

// 'https://dry-badlands-58743.herokuapp.com/launchButton'
// axios.get('http://localhost:3000/launchButton')
//     .then(res => {
//         console.log("WORKED")
//     })
//     .catch(err => {
//         console.log("ERROR!", err)
//     })
