
   // aqui podra ir todos los metodos que desean, puedan llamar servicios REST desde aca o en fin hacer
   // muchas cosas manejo de usuarios, de salas, mensajes privados, etc...


  // metodo de socket para identificar una conexion
  let clienteConectado = (io, cliente) => {
    cliente.on('usuario-conectado', (payload) => {
        console.log('Un usuario ha ingresado', payload);
    });

    // desconexion del cliente
    cliente.on('disconnect', () => {
      console.log('Usuario desconectado');
    });
  }

  // metodo para dectectar evento usuario-desconectado
  let clienteDesconectado = (io, cliente) => {
    cliente.on('usuario-desconectado', (payload) => {
      console.log('Usuario desconectado', payload);
    });
  }

  // metodo para dectectar el evento mensaje-user del usuario
  let mensajeUsuario = (io, cliente) => {
    cliente.on('mensaje-user', (payload) => {
      io.emit('mensaje-user', payload); // emitir a todos el mensaje (payload)
      console.log('Mensaje usuario', payload);
    });
  }

  // exportamos los metodos para ser accedidos desde el index
  module.exports = { clienteConectado, clienteDesconectado, mensajeUsuario };
