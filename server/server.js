const express = require("express");
const path = require("path");
const config = require("dotenv");
config.config();

let driver = require("./neo4j");

// Ports to try and use
const port = process.env.PORT || 8080;

// Location of files
const staticPath = path.join(__dirname, "..", "public");

startServer(port);

// Implementation of server
function startServer(port) {
    console.log("Creating express server.");
    var app = express();

    app.use("/node_modules", express.static(path.join(staticPath, "node_modules")));

    console.log(`Hosting from ${staticPath}...`);
    app.use(express.static(staticPath));
    
    app.get("/log-entries", (req, res, next) => {
        let session = driver.session();
        session.run(`MATCH (qe:QuestLogEntry) RETURN qe LIMIT 10`)
            .then(results => {
                if(!results || results.records.length == 0)
                    return;

                let entries = [];
                results.records.map(e => entries.push(e.get("qe").properties));
                session.close();

                res.json(entries);
            });
    });

    app.get("/log-entry/:entryID", (req, res, next) => {
        let entryID = req.params.entryID || "latest";

        let session = driver.session();
        session.run(`MATCH (qe:QuestLogEntry { entryID: $id }) RETURN qe`, { id: 1 })
            .then(results => {
                if(!results || results.records.length == 0)
                    return;

                let record = results.records[0].get("qe");
                session.close();

                res.json(record.properties);
            });
    });

    app.get("/", (req, res, next) => {
        res.sendFile(path.join(staticPath, "index.html"));
    });

    // Start up express server
    console.log(`Starting on port ${port}...`);
    app.listen(port);

    console.log(`Started at http://localhost:${port}`);
}