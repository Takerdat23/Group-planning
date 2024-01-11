import io from 'socket.io-client';
import React from 'react';

const AuthContext = React.createContext({
  loggedIn: false,
  login: () => {loggedIn = true; },
  logout: () => {loggedIn = false; },
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
  return new Promise((resolve, reject) => {
    if (!socket) {
      console.warn("Socket not connected");
      reject("Socket not connected");
      return;
    }

    const onUsernameUnique = (isUnique) => {
      if (isUnique) {
        socket.emit('signup', username, email, password);
      } else {
        console.log("Account already exist");
        reject("Account already exist");
        socket.off('UsernameUnique', onUsernameUnique);
      }
    };

    const SignUpState = (text) => {
      console.log(text); 
      if (text == 'Signup successful') {
        resolve(true);
      } else {
        reject(false);
      }
      socket.off('SignUpState', SignUpState);
    };
    socket.emit('checkUnique', username); 
    socket.on('UsernameUnique', onUsernameUnique);
    socket.on('SignUpState', SignUpState );

    
  });
};





export const login = (username, password) => {
  return new Promise((resolve, reject) => {
    if (!socket) {
      console.warn("Socket not connected");
      reject("Socket not connected");
      return;
    }

    const onUsernameUnique = (isUnique) => {
      if (!isUnique) {
        socket.emit('login', username, password);
      } else {
        console.log("Account doesn't exist");
        reject("Account doesn't exist");
        socket.off('UsernameUnique', onUsernameUnique);
      }
    };

    const LoginState = (text) => {
      console.log(text); 
      if (text.success) {
        resolve(true);
      } else {
        reject(text.message);
      }
      socket.off('LoginState', LoginState);
    };
    socket.emit('checkUnique', username); 
    socket.on('UsernameUnique', onUsernameUnique);
    socket.on('LoginState', LoginState );

    
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
