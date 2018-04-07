import * as express from "express";
import { Request, Response, NextFunction } from "express";

const path = require("path");
const config = require("dotenv");
config.config();

import driver from "./data/neo4j";
import { Character } from "./data/character";
import { Session } from "neo4j-driver/types/v1";

// Ports to try and use
const port = parseInt(process.env.PORT) || 8080;

// Location of files
const staticPath = path.join(__dirname, "..", "client");

startServer(port);

// Implementation of server
function startServer(port: number) {
    console.log("Creating express server.");
    var app = express();

    app.use("/node_modules", express.static(path.join(staticPath, "node_modules")));

    console.log(`Hosting from ${staticPath}...`);
    app.use(express.static(staticPath));
    
    app.get("/log-entries", (req: Request, res: Response, next: NextFunction) => {
        let session: Session;
        try { session = driver.session(); }
        catch {
            res.status(503).json({
                errored: true,
                message: "Database Unavailable."
            });

            return;
        }

        session.run(`MATCH (qe:QuestLogEntry) RETURN qe ORDER BY qe.date DESC LIMIT 10`)
            .then(results => {
                if(!results || results.records.length == 0)
                    return;

                let entries: any[] = [];
                results.records.map(e => entries.push(e.get("qe").properties));
                session.close();

                res.json(entries);
            });
    });

    app.get("/log-entry/:entryID", (req, res, next) => {
        let entryID = -1;
        try {
            let entryID = parseInt(req.params.entryID);
        } catch(e) { }

        let session: Session;
        try { session = driver.session(); }
        catch {
            res.status(503).json({
                errored: true,
                message: "Database Unavailable."
            });

            return;
        }

        let query;
        if(entryID == -1) 
            query = "MATCH (qe:QuestLogEntry) RETURN qe ORDER BY qe.date DESC LIMIT 1";
        else
            query = `MATCH (qe:QuestLogEntry { entryID: $id }) RETURN qe LIMIT 1`;

        session.run(query, { id: entryID })
            .then(results => {
                if(!results || results.records.length == 0) {
                    res.status(404).send();
                    return;
                }

                let record = results.records[0].get("qe");
                session.close();
                res.json(record.properties);
            });
    });

    app.get("/characters", async (req: Request, res: Response) => {
        let query = `MATCH (c:Character) RETURN c ORDER BY c.namef`;
        
        let session: Session;
        try { session = driver.session(); }
        catch {
            res.status(503).json({
                errored: true,
                message: "Database Unavailable."
            });

            return;
        }

        let results = await session.run(query);

        if(!results || results.records.length == 0) {
            res.json({
                errored: true,
                reason: "No characters fetched."
            });

            return;
        }

        session.close();
        let characters: Character[] = results.records.map(c => new Character(c.get("c").properties));
        res.json(characters);
    });

    app.get("/", (req, res, next) => {
        res.sendFile(path.join(staticPath, "index.html"));
    });

    app.get("*", (req, res, next) => {
        res.sendFile(path.join(staticPath, "index.html"));
    });

    // Start up express server
    console.log(`Starting on port ${port}...`);
    app.listen(port);

    console.log(`Started at http://localhost:${port}`);
}