// Simulated database
const users = [
    { id: 'student123', name: 'Ali Raza' },
    { id: 'student456', name: 'Fatima Noor' },
  ];
  
  const getUserById = (userId) => users.find(user => user.id === userId);
  
  module.exports = { getUserById };  