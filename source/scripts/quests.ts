import * as MarkdownIt from "markdown-it";

let md = new MarkdownIt();

export function loadQuestEntries() {
    fetch("/log-entries")
        .then(text => {
            return text.json();
        })

        .then(json => {
            let container = document.querySelector("#quest-entry-container") || document.createElement("div");
            if(!container.id) {
                container.id = "quest-entry-container";

                //@ts-ignore
                document.querySelector("main").appendChild(container);
            }

            json.forEach((entry: any) => {
                
                console.log(entry);

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

                // if(entry.content) {
                //     let div = document.createElement("div");
                //     let content64 = entry.content;
                //     let content = atob(content64);

                //     div.innerHTML = md.render(content);

                //     article.appendChild(div);
                // }

                container.appendChild(article);
            });
        });
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