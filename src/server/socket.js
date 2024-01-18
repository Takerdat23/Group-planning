import io from 'socket.io-client';

let socket = null
if(!socket || !socket.connected) {
  // socket = io(endpoint, {
  //   path: path,
  // });
  socket = io("http://192.168.15.102:4000")
}

export default socket