# PTC Dungeons and Dragons Club Website

[![Build Status](https://travis-ci.org/robotgryphon/ptc-dungeons-site.svg?branch=master)](https://travis-ci.org/robotgryphon/ptc-dungeons-site)

To install, download or clone the repository and use NPM to install the assets.

Make sure you have a `.env` file set up with the Neo4J configuration to connect to, so
the quest log system works. It's expecting `NEO4J_` environment variables for 
`URL`, `USER`, and `PASS`.

Then either with Visual Studio Code or some command line terminal, run the server.js file 
inside the server directory.

## Completed Pages:

- [x] Home Page
- [ ] About the Club
- [x] What is DND?
- [x] Quest Log
    - [x] Full log listing
    - [x] Individual log entries
- [x] Join the Club
- [x] Character Bios
- [x] Resources
- [x] Site Credits
