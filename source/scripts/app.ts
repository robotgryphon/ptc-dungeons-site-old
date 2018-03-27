//@ts-ignore
import Navigo from "navigo";

import loadQuestEntries from "./quests";

interface Mapping {
    [key: string]: IPageMapping
}

interface IPageMapping {
    file: string,
    pages: string[],
    scripts?: string[]
}

// Create page mappings.
// Keys are filenames, value is an array of all URLs that map to it
let pageMapping: Mapping = {
    "home": {
        file: "home",
        pages: ["home"] 
    },

    "about": { 
        file: "about",
        pages: ["about"] 
    },

    "about-dnd": { 
        file: "about-dnd",
        pages: ["about-dnd", "what-is-dnd"] 
    },

    "quest-log": { 
        file: "quest-log",
        pages: ["quest-log"],
        scripts: [ "quest" ]
    },

    "bios": { 
        file: "bios",
        pages: ["character-bios", "bios"] 
    },

    "resources": { 
        file: "resources",
        pages: ["resources"] 
    },

    "credits": { 
        file: "credits",
        pages: ["credits"] 
    }
}

// Create Navigo router
let router = new Navigo(null, true, "#");

// Map URLs to files
for(let mappingKey in pageMapping) {
    let mapping: IPageMapping = pageMapping[mappingKey];
    mapping.pages.forEach(page => {
        router.on(page, () => loadPage(mapping.file));
    });
}

// DEfault route, called for "home page"
router.on(() => loadPage("home"));

// Not found page
router.notFound((query: any) => loadPage("not-found"));

// Create router and load first route
router.resolve();

function loadPage(page: string) {
    fetch(`../pages/${page}.html`)
        .then((res) => {
            return res.text();
        })

        .then((data) => {
            let main = document.querySelector("main");
            if (!main) return;

            main.innerHTML = data;

            if(page == "quest-log") loadQuestEntries();
        });
}