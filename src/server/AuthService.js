import io from 'socket.io-client';
import React from 'react';

const AuthContext = React.createContext({
  loggedIn: false,
  login: () => {},
  logout: () => {},
});

export default AuthContext;

let socket; // Declare socket variable at the module level to maintain its scope

export const connectSocket = () => {
  console.log("Attempting to connect to server...");
  // change the ip address according to your device 
  socket = io('https://groupplanning-26349a3e30f0.herokuapp.com'); 

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



export const login = (username, password) => {
  return new Promise((resolve, reject) => {
    if (!socket) {
      console.warn("Socket not connected");
      reject("Socket not connected");
      return;
    }

    socket.emit('checkUnique', username); 
    socket.on('UsernameUnique', (isUnique) => {
      if (!isUnique) {
        socket.emit('login', username, password);
        socket.on('serverLog', (text) => {
          if (text.success) {
            resolve(true); // Resolve the promise with true if login is successful
          } else {
            reject(text.message); // Reject the promise if there is an error
          }
        });
      } else {
        console.log("Account doesn't exist");
        reject("Account doesn't exist"); // Reject the promise as the account doesn't exist
      }
    });
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
