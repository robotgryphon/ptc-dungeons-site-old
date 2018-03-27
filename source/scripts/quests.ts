import * as MarkdownIt from "markdown-it";

let md = new MarkdownIt();

export function loadEntries() {
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
                
                let article = document.createElement("article");
                if(entry.title) {
                    let title = document.createElement("h2");
                    title.innerText = entry.title;
                    article.appendChild(title);
                }
                
                if(entry.content) {
                    let div = document.createElement("div");
                    let content64 = entry.content;
                    let content = atob(content64);

                    div.innerHTML = md.render(content);

                    article.appendChild(div);
                }

                container.appendChild(article);
            });
        });
}

export default loadEntries;