import driver from "./neo4j";

export class Character {
    public namef: string;
    public namel: string;

    constructor(properties: any) {
        Object.assign(this, properties);
    }

    static async fetchById(id: number): Promise<Character> {
        let session = driver.session();
        let query = `MATCH (c:Character) WHERE id(c) = $id RETURN c LIMIT 1`;
        let results = await session.run(query, { id: id });
        
        if(!results || results.records.length == 0) {
            return Promise.reject("No results found.");
        }

        let record = results.records[0].get("c");
        session.close();
        return Promise.resolve(new Character(record.properties));
    }
}