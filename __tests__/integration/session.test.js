const { User } = require('./../../src/app/models');
const request = require('supertest');
const app = require('../../src/app');
const factory = require('../factories');

//Um arquivo de testes pode ter mais de um teste e contextos de testes.
//O describe() contextualiza um conjunto de testes.
describe('Authentication', () => {

  //O Jest disponibiliza alguns métodos que rodam de acordo com a ordem cronológica de execução:

  //beforeEach() - Executa uma ação antes de cada teste
  //beforeAll() - Executa uma ação antes de todos os testes
  //afterEach() - Executa uma ação depois de cada teste
  //afterAll() - Executa uma ação depois de todos os testes

  //o 'it' é usado para descrever o que aquele teste está executando, ele se chama assim porque tecnicamente ele fica fazendo parte da sentença descritiva 'it' (isso) 'should' (deve) etc...
  it('should authenticate with valid credentials', async () => {
    const user = await factory.create('User', {
      password: '123'
    });

    console.log(user);

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123'
      });

      expect(response.status).toBe(200);
  });

  it('should not authenticate with invalid credentials', async () => {
    const user = await User.create({
      name: 'Mikael',
      email: 'mikaelrsimoes19@gmail.com2',
      password: '123'
    });

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123456'
      });

      expect(response.status).toBe(401);
  });

  it('should return a JWT token when authenticated', async () => {
    const user = await User.create({
      name: 'Mikael',
      email: 'mikaelrsimoes19@gmail.com3',
      password: '123'
    });

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123'
      });

    expect(response.body).toHaveProperty('token');
  });

  it('should be able to access private routes when authenticated', async () => {
    const user = await User.create({
      name: 'Mikael',
      email: 'mikaelrsimoes19@gmail.com5',
      password: '123'
    });

    const response = await request(app)
      .get('/dashboard')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      

    expect(response.status).toBe(200);
  });

  it('should not be able to access private routes without jwt token', async () => {
    const response = await request(app).get('/dashboard');

    expect(response.status).toBe(401);
  });

  it('should not be able to access private routes without jwt token', async () => {
    const response = await request(app)
      .get('/dashboard')
      .set('Authorization', `Bearer 123123`)
      

    expect(response.status).toBe(401);
  });
});
