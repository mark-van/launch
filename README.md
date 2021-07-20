# Launch

Interactive streaming web application where pressing a launch button results in a immediate response on a embedded twitch live stream. Viewers can post launch suggestions and discuss the viability of these plans with the website's post and comment functionality. The launch button triggers a specific websocket message (launch key) which is sent to the WebSocket server, and then broadcasted to all devices(including the pi). The raspberry pi then executes a command to run the code which performs the 'launch'.

Launch web app is a available at https://dry-badlands-58743.herokuapp.com.

### Launch Web application
Web application build using express, EJS, mongoose, and mongoDB. Post and comment functionaly was implemented with referenc to online [web developmetn course](https://www.udemy.com/course/the-web-developer-bootcamp/) 

### [Launch Rasberry Pi repository](https://github.com/markvangenderen/launch-pi "Launch Rasberry Pi reopository")
Client side WebSocket running on raspberry pi which executes launch immediately when launch signal is received

### [Launch WebSocket Server repository](https://github.com/markvangenderen/launch-ws-server "Launch WebSocket Server")
WebSocket server which broadcasts launch signal to all clients when a launch key is received. Deployed on a separate heroku server.


