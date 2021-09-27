const bcrypt = require('bcryptjs');
const { User } = require('../../src/app/models');

describe('User', () => {
  it('should encrypt user password', async () => {
    const user = await User.create({
      name: 'Mikael',
      email: 'mikaelrsimoes19@gmail.com4',
      password: '123456'
    });

    const compareHash = await bcrypt.compare('123456', user.password_hash);

    expect(compareHash).toBe(true);
  });
});