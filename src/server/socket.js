import io from 'socket.io-client';
import { signal, effect } from '@preact/signals-react';

export const ttuser = signal([])
export const uEmail = signal("")

let socket = null
if(!socket || !socket.connected) {
  // socket = io(endpoint, {
  //   path: path,
  // });
  socket = io("http://192.168.15.102:4000")
}

export default socket