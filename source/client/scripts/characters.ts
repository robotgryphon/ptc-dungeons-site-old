let character: any;


export async function loadCharacters() {

    let main: Element | undefined = document.querySelector("#character-bios-container");

    try {
        let res: Response = await fetch("/characters")
        let characters: any[] = await res.json();
        characters.forEach(character => {
            let template = `
                <div class="character">
                    <h3>${character.namef} ${character.namel}</h3>
                    <h5>Played by ${character.player}</h5>
                </div>
            `;

            let newCharacter = document.createElement("div");
            newCharacter.innerHTML = template;

            main.appendChild(newCharacter);
        });
    }

    catch {
        main.innerHTML = "Could not load character data.";
    }
    
}