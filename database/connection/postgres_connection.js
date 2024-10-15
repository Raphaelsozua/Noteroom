const pgp = require("pg-promise")()

const postgresdb = pgp("postgress://postgres:1234@localhost:5432/noteroom");

postgresdb.query("select 1 + 1 as result", (err, result) => {
    if (err) {
        console.error(err);
    } else {
        console.log(result);
    }
});

module.exports = postgresdb;