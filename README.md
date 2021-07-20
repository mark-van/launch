# Launch

Interactive streaming service where pressing a launch button results in a immediate response on the live stream. Viewers can post launch suggestions and discuss the viability of these plans on the website. The launch button triggers as websocket message which is sent to the ws server, and then broadcasted to all devices(including the pi). The raspberry pi then executes a command to run the code which performs the 'launch'.

[Launch Rasberry Pi repository](https://github.com/markvangenderen/launch-pi "Launch Rasberry Pi reopository")

[Launch WebSocket Server repository](https://github.com/markvangenderen/launch-ws-server "Launch WebSocket Server")



