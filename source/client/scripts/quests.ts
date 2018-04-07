import * as MarkdownIt from "markdown-it";

let md = new MarkdownIt();

export async function loadQuestEntries() {
    let entries: Response;
    let entryJson: any[];
    let container = document.querySelector("#quest-entry-container") || document.createElement("div");

    try {
        entries = await fetch("/log-entries");
        entryJson = await entries.json();
        
        if(entries.status == 503)
            throw new Error((entryJson as any).message);
    }

    catch(e) {
        container.innerHTML = e;
        return;
    }

    if(!container.id) {
        container.id = "quest-entry-container";

        //@ts-ignore
        document.querySelector("main").appendChild(container);
    }

    console.log(entryJson);
    entryJson.forEach((entry: any) => {
        let e = generateEntry(entry);
        container.appendChild(e);
    });
}

function generateEntry(entry: any): HTMLElement {
    let article = document.createElement("article");
    if(entry.title) {
        let title = document.createElement("h2");
        title.innerText = entry.title;
        article.appendChild(title);
    }
    
    if(entry.date) {
        let date = document.createElement("div");
        date.classList.add("log-entry-date");

        let datef = new Date(entry.date);
        date.innerText = datef.toLocaleString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "numeric"
        });

        article.appendChild(date);
    }

    let link = document.createElement("div");
    link.classList.add("log-entry-link");
    
    let linkAnchor = document.createElement("a");
    linkAnchor.href = "/#/quest-log/entry/" + entry.entryID.low;
    linkAnchor.innerText = "Read Entry";

    link.appendChild(linkAnchor);
    article.appendChild(link);

    return article;
}

export function loadQuestEntry(id: number) {
    let title: HTMLElement = document.querySelector(".quest-entry-title");
    let body: HTMLElement = document.querySelector(".quest-entry-body");
    let date: HTMLElement = document.querySelector(".quest-entry-date");

    fetch(`/log-entry/${id}`)
        .then((data: any) => {
            return data.json();
        })
        
        .then((json: any) => {
            let t = json.title;
            let b = json.content;
            let d = json.date;

            let datef = new Date(d);
            date.innerText = datef.toLocaleString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "numeric"
            });

            title.innerText = t;

            let html = md.render(atob(b));
            body.innerHTML = html;
        });
}

export default loadQuestEntry;