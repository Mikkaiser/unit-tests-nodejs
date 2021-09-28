const { factory } = require('factory-girl');
const { User } = require('../src/app/models');
const faker = require('faker');

//testing the factory-girl lib and the faker lib (to generate fictitious data)
factory.define('User', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password()
});

module.exports = factory;