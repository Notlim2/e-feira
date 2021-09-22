'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          name: 'Enzo Miguel',
          email: 'enzo_mg@gmail.com',
          password: '123456',
        },
        {
          name: 'Juliana Oliveira',
          email: 'juli_oli@gmail.com',
          password: '654321',
        },
        {
          name: 'Antônio Ferreira',
          email: 'antoni_ferr@gmail.com',
          password: '246810',
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
