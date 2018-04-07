import { v1 as neo4j } from "neo4j-driver";
import { Driver } from "neo4j-driver/types/v1";

let env = process.env;

let url = env.GRAPHENEDB_BOLT_URL || env.NEO4J_URL;
let user = env.GRAPHENEDB_BOLT_USER || env.NEO4J_USER;
let pass = env.GRAPHENEDB_BOLT_PASSWORD || env.NEO4J_PASS;

let driver: Driver;
try {
    driver = neo4j.driver(url, neo4j.auth.basic(user, pass));
}

catch { }

export default driver;