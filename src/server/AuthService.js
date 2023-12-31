import io from 'socket.io-client';

let socket; // Declare socket variable at the module level to maintain its scope

export const connectSocket = () => {
  console.log("Attempting to connect to server...");

  socket = io('http://192.168.13.3:4000'); 

  socket.on('connect', () => {
    console.log('Connected to server');
  });
  return socket;
};

export const signup = (username, email, password) => { 
  if (!socket) {
    console.warn("Socket not connected");
    return;
  }
  let unique ;
  socket.emit('checkUnique', username); 

  socket.on('UsernameUnique', async (isunique) =>{ 
    unique= isunique; 
  
  
  if (unique){
    
    socket.emit('signup', username, email, password);
    socket.on('serverLog', (text) => {
    console.log(text);
  });
  }
  else{
    socket.on('usernametaken', (text) => {
        console.log(text)
    });
  }
}); 

  
};

export const getSocket = () => {
  return socket; // Return the socket instance
};

export const disconnectSocket = () => {
  if (socket) {
    console.log("Disconnecting socket...");
    socket.disconnect();
  }
};
