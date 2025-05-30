require("dotenv").config();

module.exports = {
  development: {
    username: "postgres",
    password: "postgres",
    database: "bakery_db",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  test: {
    username: "postgres",
    password: "postgres",
    database: "bakery_db_test",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  production: {
    use_env_variable: "DATABASE_URL",
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
