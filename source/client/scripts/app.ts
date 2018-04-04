//@ts-ignore
import * as Navigo from "navigo";


import { loadQuestEntries, loadQuestEntry } from "./quests";
import { loadCharacters } from "./characters";

interface Mapping {
    [key: string]: IPageMapping
}

interface IPageMapping {
    title?: string,
    pages: string[],
    scripts?: string[]
}

// Create page mappings.
// Keys are filenames, value is an array of all URLs that map to it
let pageMapping: Mapping = {
    "home": {
        title: "Home Page",
        pages: ["home"] 
    },

    "about": { 
        title: "About the Club",
        pages: ["about"] 
    },

    "about-dnd": { 
        title: "About Dungeons and Dragons",
        pages: ["about-dnd", "what-is-dnd"] 
    },

    "quest-log": { 
        title: "Nicole's Quest Log",
        pages: ["quest-log"]
    },

    "join-the-club": {
        title: "Join the Club",
        pages: ["join", "join-the-club"]
    },

    "bios": { 
        title: "Character Bios",
        pages: ["character-bios", "bios"] 
    },

    "resources": { 
        title: "Resources",
        pages: ["resources"] 
    },

    "credits": { 
        pages: ["credits"] 
    }
}

// Create Navigo router
let router = new Navigo(null, true, "#");

// Map URLs to files
for(let mappingKey in pageMapping) {
    let mapping: IPageMapping = pageMapping[mappingKey];
    mapping.pages.forEach(page => {
        router.on(page, () => loadPage(mappingKey));
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
                let title = pageMapping[page].title || "";
                document.title = (title ? `${title} | ` : "") +  `PTC Dungeons and Dragons Club`;

                let main = document.querySelector("main");
                if (!main) return;

                main.innerHTML = data;

                switch(page.toLowerCase()) {
                    case "bios":
                        loadCharacters();
                        break;

                    case "quest-log":
                        loadQuestEntries();
                        break;
                }

                res();
            });
        });
}
