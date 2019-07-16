
  const mongoose = require('mongoose');
  const http = require('http');
  const colors = require('colors');
  const app = require('./index');
  const PORT = process.env.PORT || 2000;
  const socketIO = require('socket.io'); // requerimos paquete de socket.io
  const metodosSockets = require('./sockets/socket'); // aqui estaran los metodos que podran ser accedidos atraves de los sockets

  // inicializamos http con el servidor de express(app)
  const httpServer = http.createServer(app);

  // inicializamos socket.io con el servidor montado en http
  const io = socketIO(httpServer);

  // conexion a la base de datos de mongo
  mongoose.connect('mongodb://localhost:27017/sockets', { useNewUrlParser : true, useCreateIndex : true })
          .then(() => {

            console.log('Conexion a la base de datos establecida'.bgCyan);

            httpServer.listen(PORT, () => {
              console.log(`Servidor corriendo en el puerto: ${ PORT }`.bgMagenta);
            });

          })
          .catch(error => console.log(error));

  // metodos de los sockets
  io.on('connection', (cliente) => {

    metodosSockets.clienteConectado(io, cliente);

    metodosSockets.clienteDesconectado(io, cliente);

    metodosSockets.mensajeUsuario(io, cliente);

    // desconexion
    cliente.on('disconnect', () => {
      console.log('Cliente desconectado');
    });

  });
