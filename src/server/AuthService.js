import io from 'socket.io-client';
import React from 'react';
 

const AuthContext = React.createContext({
  loggedIn: false,
  login: () => {loggedIn = true; },
  logout: () => {loggedIn = false; },
});

export default AuthContext;

// Declare socket variable at the module level to maintain its scope
const endpoint = "https://group-planning-websocket.webpubsub.azure.com"
const path = "/clients/socketio/hubs/group_planning"

let isConnect = false
let socket = null
if(!isConnect) {
  socket = io(endpoint, {
    path: path,
  });
}

socket.on('handshake', (word) => {
  console.log(word);
  isConnect = true;
});

socket.on("disconnect", () => {
  console.log("disconnect from server")
  isConnect = false
})

export function signup(username, email, password) {
  const userData = {
    name: username,
    email: email, 
    password: password, 
  };

  socket.emit('sign-up', userData)
  return new Promise((resolve, reject) => {
    socket.on("user log", (message) => {
      if(message == "Signup successful")
        resolve()
      else 
        reject(message)
      socket.off("user log")
    })
  })
};



export function login(email, password) {
  const userData = {
    email: email, 
    password: password, 
  };

  socket.emit('login', userData);

  return new Promise((resolve, reject) => {
    socket.on("user log", (message) => {
    
      if(message == "login successful")
        resolve()
      else
        reject(message)
      socket.off("user log")
    });

    
  })
};


export const getUser = () => { 

  return new Promise((resolve)=> { 
    if (!socket) {
      console.warn("Socket not connected");
      reject("Socket not connected");
      return;
    }

    const getusername = (text) => { 
 
      if (text){ 

        resolve(text); 
      }
      else{ 
        console.log("Returned null user"); 
      }
      
      socket.off("user change", getusername); 
    }

    socket.on("user change", getusername); 
  }); 

  ; 
}; 

//Project
export const newProject = (projectName) => {
  if (!socket) {
    console.warn("Socket not connected");
    return;
  }
  console.log(projectName);
  socket.emit('newProject', projectName);
  socket.on('serverLog', (text) => {
    console.log(text);
  });
}

export const getProjects = () => {
  return new Promise((resolve, reject) => {
    if (!socket) {
      console.warn("Socket not connected");
      reject("Socket not connected");
      return;
    }
    socket.emit('getProject');
    socket.on('Projects', (projects) => {
      //console.log(projects);
      resolve(projects); // Resolve the promise with the received projects
    });

    // Listen for errors
    socket.on('error', (error) => {
      console.error("Socket error:", error);
      reject(error); // Reject the promise if there's an error
    });
  });
};

export const deleteProject = (id) => {
  if (!socket) {
    console.warn("Socket not connected");
    return;
  }
  console.log(id);
  socket.emit('deleteProject', id);
  socket.on('serverLog', (text) => {
    console.log(text);
  });
}

//Task
export const addTask = (taskName) => {
  if (!socket) {
    console.warn("Socket not connected");
    return;
  }
  console.log(taskName);
  socket.emit('newTask', taskName);
  socket.on('serverLog', (text) => {
    console.log(text);
  });
}

export const getTask = () => {
  return new Promise((resolve, reject) => {
    if (!socket) {
      console.warn("Socket not connected");
      reject("Socket not connected");
      return;
    }
    socket.emit('getTask');
    socket.on('Tasks', (tasks) => {
      console.log(tasks);
      resolve(tasks); // Resolve the promise with the received tasks
    });

    // Listen for errors
    socket.on('error', (error) => {
      console.error("Socket error:", error);
      reject(error); // Reject the promise if there's an error
    });
  });
};

export const deleteTask = (id) => {
  if (!socket) {
    console.warn("Socket not connected");
    return;
  }
  console.log(id);
  socket.emit('deleteTask', id);
  socket.on('deleteTask log', (text) => {
    console.log(text);
  });
}

export const updateTask = (taskID, task) => {
  if (!socket) {
    console.warn("Socket not connected");
    return;
  }
  console.log(task);
  socket.emit('updateTask',taskID, task);
  socket.on('updateTask log', (text) => {
    console.log(text);
  });
}


export const getSocket = () => {
  return socket; // Return the socket instance
};

export const disconnectSocket = () => {
  if (socket) {
    console.log("Disconnecting socket...");
    socket.disconnect();
  }
};
