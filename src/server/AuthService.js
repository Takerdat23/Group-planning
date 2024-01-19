import React from 'react';
import socket from './socket'; 
import { ttuser, uEmail } from './socket';

const AuthContext = React.createContext({
  login: () => {loggedIn = true;},
  logout: () => {loggedIn = false;}
});

export default AuthContext;

socket.on('handshake', (word) => {
  console.log(word);
});

socket.on("disconnect", (reason) => {
  console.log(reason)
  console.log("disconnect from server")
})

socket.on("project change", (message) => {
  if(message == "Project change successful") {
    socket.emit("get projects", uEmail.value)
    socket.on("shared projects", (message, shPrjs) => {
      if(message == "True") {
        ttuser.value = shPrjs
        console.log(ttuser.value.length)
      }
      else
        console.log(message)
      socket.off("get projects")
    })
  }
  else
    console.log(message)
})

export function signup(username, email, password) {
  const userData = {
    name: username,
    email: email, 
    password: password, 
  };

  socket.emit('sign-up', userData)
  const signupPromise =  new Promise((resolve, reject) => {
    socket.on("user log", (message) => {
      if(message == "Signup successful")
        resolve()
      else 
        reject(message)
      socket.off("user log")
    })
  })

  const timeOut = new Promise((resolve, reject) => {
    setTimeout(reject, 3000, "Server doesn't response, please try again")
  })

  return Promise.race([signupPromise, timeOut])
};



export function login(email, password) {
  const userData = {
    email: email, 
    password: password, 
  };

  socket.emit('login', userData);

  const loginPromise =  new Promise((resolve, reject) => {
    socket.on("user log", (message, user) => {
      if(message == "Login successful")
        resolve(user)
      else
        reject(message)
      socket.off("user log")
    });
  })

  const timeOut = new Promise((resolve, reject) => {
    setTimeout(reject, 3000, "Server doesn't response, please try again")
  })

  return Promise.race([loginPromise, timeOut])
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
export function addProject(projectData) {
  if(!socket.connected)
    return new Promise.reject("Please check internet connection")

  socket.emit("add project", projectData);
  const addPromise =  new Promise((resolve, reject) => {
    socket.on("add project log", (message, data) => {
      if(message == "Add project successful")
        resolve(data)
      else
        reject(message)
      socket.off("add project log")
    });
  })

  const timeOut = new Promise((resolve, reject) => {
    setTimeout(reject, 3000, "Server doesn't response, please try again")
  })

  return Promise.race([addPromise, timeOut])
}

export function addNewMember(projectID, master, member) {
  if(!socket.connected)
    return new Promise.reject("Please check internet connection")

  socket.emit("add member", projectID, master, member);

  const memberPromise =  new Promise((resolve, reject) => {
    socket.on("add member log", (message) => {
      if(message == "Add project successful")
        resolve(message)
      else
        reject(message)
      socket.off("add member log")
    });
  })

  const timeOut = new Promise((resolve, reject) => {
    setTimeout(reject, 5000, "Server doesn't response, please try again")
  })

  return Promise.race([memberPromise, timeOut])
}

export const getProjects = (email) => {
  if(!socket.connected)
    return new Promise.reject("Please check internet connection")

  socket.emit("get projects", email);
  const getPromise =  new Promise((resolve, reject) => {
    socket.on("get project log", (message, data) => {
      if(message == "Get project successful")
        resolve(data)
      else
        reject(message)
      socket.off("get project log")
    });
  })

  const timeOut = new Promise((resolve, reject) => {
    setTimeout(reject, 3000, "Server doesn't response, please try again")
  })

  return Promise.race([getPromise, timeOut])
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
export const addTask = (taskData, projectID) => {
  if (!socket) {
    console.warn("Socket not connected");
    return;
  }
  
  socket.emit("add task", taskData, projectID)
  const addPromise = new Promise((resolve, reject) => {
    socket.on("add task log", (message) => {
      if(message == "Add task successful")
        resolve(message)
      else
        reject(message)
      socket.off("add task log")
    });
  })

  const timeOut = new Promise((resolve, reject) => {
    setTimeout(reject, 3000, "Server doesn't response, please try again")
  })

  return Promise.race([addPromise, timeOut])
}

export const getTask = (projectID) => {
  socket.emit('get task', projectID);
  const getPromise =  new Promise((resolve, reject) => {
    socket.on("return task log", (message, data) => {
      if(message == "Get task successful")
        resolve(data)
      else
        reject(message)
      socket.off("return task log")
    });
  })

  const timeOut = new Promise((resolve, reject) => {
    setTimeout(reject, 3000, "Server doesn't response, please try again")
  })

  return Promise.race([getPromise, timeOut])
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
