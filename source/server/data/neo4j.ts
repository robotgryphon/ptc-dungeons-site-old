import { v1 as neo4j } from "neo4j-driver";

let env = process.env;

let url = env.GRAPHENEDB_BOLT_URL || env.NEO4J_URL;
let user = env.GRAPHENEDB_BOLT_USER || env.NEO4J_USER;
let pass = env.GRAPHENEDB_BOLT_PASSWORD || env.NEO4J_PASS;

const driver = neo4j.driver(url, neo4j.auth.basic(user, pass));

export default driver;