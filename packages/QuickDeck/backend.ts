import { BackendApp } from '@awtrix/common'



export default (App: typeof BackendApp) => {
  return class ExampleApp extends App {
    register() {
      const net = require('net')
      console.log(this.io.sockets)
      console.log('My app was successfully registered.')
      var TCPclient = new net.Socket();

      TCPclient.on('data', (data) => {
        console.log('Received: ' + data);
        this.io.emit('quickdeck', data.toString());
      });

      this.io.on('connection', (socket) => {
        socket.on('quickdeck1', (data) => {
          TCPclient.write(data)
        });
        socket.on('quickdeckGetData', (data) => {
          TCPclient.write(data)
        });
      });



      TCPclient.connect(8888, 'localhost', function () {
        console.log('Connected');
      });

      TCPclient.on('error', function () { }); // need this line so it wont throw exception

      // Add a 'close' event handler for the client socket
      TCPclient.on('close', function () {
        TCPclient.connect(8888, 'localhost')
      });

    };

  }
}
