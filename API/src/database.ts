import Sequelize from 'sequelize';

const sequelize = new Sequelize.Sequelize(
  'u514786799_savinggrace',
  'u514786799_savinggraceapp',
  process.env.SQLPASSWORD,
  {
    host: 'sql255.main-hosting.eu',
    dialect: 'mysql'
  }
);

export default sequelize;
