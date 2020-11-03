const userRole = [
  {
    user_id: 1,
    role_id: 1,
  },
  {
    user_id: 2,
    role_id: 2,
  },
];

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('user_role', userRole);
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete('user_role', null, {});
  },
};
