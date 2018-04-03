//@ts-ignore
import * as Navigo from "navigo";


import { loadQuestEntries, loadQuestEntry } from "./quests";

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
        pages: ["quest-log"]
    },

    "join-the-club": {
        file: "join-the-club",
        pages: ["join", "join-the-club"]
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

router.on("/quest-log/entry/:id", (params: any) => {
    loadPage("quest-log-entry")
        .then(_ => loadQuestEntry(params.id));
});

// Not found page
router.notFound((query: any) => loadPage("not-found"));

// Create router and load first route
router.resolve();

function loadPage(page: string): Promise<void> {
    return new Promise((res: Function, rej: Function) => {
        fetch(`../pages/${page}.html`)
            .then((res: any) => {
                return res.text();
            })

            .then((data: any) => {
                let main = document.querySelector("main");
                if (!main) return;

                main.innerHTML = data;

                if(page == "quest-log") loadQuestEntries();

                res();
            });
        });
}