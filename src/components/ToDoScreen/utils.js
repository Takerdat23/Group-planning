export const getStatusStyle = (status) => {
    switch (status) {
      case 'To do':
        return { backgroundColor: '#F6FE72' };
      case 'Done':
        return { backgroundColor: '#86D557' };
      case 'Pending':
        return { backgroundColor: '#5FCEE9' };
      default:
        return { backgroundColor: '#ddd' }; 
    }
  };


export const getRelativeTime = (date) => {
    const now = new Date();
    const seconds = Math.round((now - date) / 1000);
    const minutes = Math.round(seconds / 60);
    const hours = Math.round(minutes / 60);
    const days = Math.round(hours / 24);
  
    if (seconds < 60) return `${seconds} seconds ago`;
    else if (minutes < 60) return `${minutes} minutes ago`;
    else if (hours < 24) return `${hours} hours ago`;
    else return `${days} days ago`;
  };
  