import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";

dotenv.config();

const db_host = process.env.DB_HOST;
const db_port = process.env.DB_PORT;
const db_user = process.env.DB_USER;
const db_password = process.env.DB_PASSWORD;
const db_database = process.env.DB_DATABASE;

const sequelize = new Sequelize(
  `postgres://${db_user}:${db_password}@${db_host}:${db_port}/${db_database}`,
  {
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

// const sequelize = new Sequelize(db_service!, db_user!, db_password, {
//   host: db_host,
//   port: Number(db_port),
//   dialect: "oracle",
//   dialectOptions: {connectString: 'localhost/freepdb1',
//   maxRows: 100, fetchAsString: [OracleDB.NUMBER]}
// });

export async function runApp() {
  try {
    await sequelize.authenticate();
    console.log("Authentication Successful");
  } catch (err) {
    console.error(err);
  }
}

export default sequelize;
