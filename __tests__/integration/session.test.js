const { User } = require('./../../src/app/models');
const request = require('supertest');
const app = require('../../src/app');
const expectExport = require('expect');

//Um arquivo de testes pode ter mais de um teste e contextos de testes.
//O describe() contextualiza um conjunto de testes.
describe('Authentication', () => {
  //o 'it' é usado para descrever o que aquele teste está executando, ele se chama assim porque tecnicamente ele fica fazendo parte da sentença descritiva 'it' (isso) 'should' (deve) etc...
  it('should authenticate with valid credentials', async () => {
    const user = User.create({
      name: 'Mikael',
      email: 'mikaelrsimoes19@gmail.com',
      password_hash: '123'
    });

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123456'
      });

      expect(response.status).toBe(200);
  });

});
