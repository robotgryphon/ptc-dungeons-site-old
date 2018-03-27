const neo4j = require("neo4j-driver").v1;

let database = {};
let env = process.env;

database.url = env.GRAPHENEDB_BOLT_URL || env.NEO4J_URL;
database.user = env.GRAPHENEDB_BOLT_USER || env.NEO4J_USER;
database.pass = env.GRAPHENEDB_BOLT_PASSWORD || env.NEO4J_PASS;

const driver = neo4j.driver(database.url, neo4j.auth.basic(database.user, database.pass));

module.exports = driver;