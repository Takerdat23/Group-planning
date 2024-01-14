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
  socket = io('http://192.168.13.2:4000'); 

  socket.on('connect', () => {
    console.log('Connected to server');
  });
  return socket;
};


export const signup = (username, email, password) => {
  const userData = {
    name: username,
    email: email, 
    password: password, 
  };

  socket.emit('sign-up', userData);

  return new Promise((resolve, reject) => {
    if (!socket) {
      console.warn("Socket not connected");
      reject("Socket not connected");
      return;
    }

    
    const SignUpState = (text) => {
      console.log(text); 
      
      if (text == 'Signup successful') {
        resolve(true);
      } else {
        reject(false);
      }
      socket.off('SignUpState', SignUpState);
    }; 
    socket.on('SignUpState', SignUpState );
   
  });
};





export const login = (username, password) => {

  const userData = {
    email: username, 
    password: password, 
  };
  socket.emit('login', userData);

  return new Promise((resolve, reject) => {
    if (!socket) {
      console.warn("Socket not connected");
      reject("Socket not connected");
      return;
    }

    const LoginState = (text) => {
      
      console.log(text); 
      if (text.success) {
        resolve(true);
      } else {
        reject(text);
      }
      socket.off('LoginState', LoginState);
    };

    socket.on('LoginState', LoginState );    
  });
};


export const getUser = () => { 
  return new Promise((resolve)=> { 
    if (!socket) {
      console.warn("Socket not connected");
      reject("Socket not connected");
      return;
    }

    const getusername = (text) => { 
      if (!text){ 
        console.log(text); 
        resolve(text); 
      }
      else{ 
        console.log("Returned null user"); 
      }
      
      socket.off('user change', getusername); 
    }

    socket.on('user change', getusername); 
  }); 

  ; 
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
