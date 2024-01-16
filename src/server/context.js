import React, { createContext, useContext, useState, useEffect } from 'react';


//user context

const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(''); 


  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);


// member colors context 


const MemberContext = createContext([]); 


export const MemberContextProvider = ({ children }) => {
  const [Memberlist, setMemberlist] = useState([]);
  return (
    <MemberContext.Provider value={{ Memberlist, setMemberlist }}>
      {children}
    </MemberContext.Provider>
  );
};



export const useMembers = () => {
  const context = useContext(MemberContext);
  if (context === undefined) {
    throw new Error('useList must be used within a setMemberlist');
  }
  return context;
};


// project counts 

const ProjectCountsContext = createContext({
  Personal_Projects: 0, 
  Shared_Projects: 0,
}); 


async  function fetchLatestCount(newCount) {
  return Promise.resolve(newCount); 
}


export const ProjectContextProvider = ({ children }) => {
  const [projectData, setProjectData] = useState({
                                            Personal_Projects: 0, 
                                            Shared_Projects: 0,});


  // Function to update the count
  const updateCount = async (newCount) => {
    setProjectData(newCount);
  };

  useEffect(() => {
     
    const interval = setInterval(() => {
    
     
    }, 1000);

      return () => clearInterval(interval);
      }, [projectData]);

  

  return (
    <ProjectCountsContext.Provider value={{ projectData, setProjectData,  updateCount }}>
      {children}
    </ProjectCountsContext.Provider>
  );
};



export const useProjectsCount = () => {
  const context = useContext(ProjectCountsContext);
  if (context === undefined) {
    throw new Error('useList must be used within a setMemberlist');
  }
  return context;
};
