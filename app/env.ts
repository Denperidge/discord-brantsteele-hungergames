import { config } from "dotenv";

config();

function getFromEnv(key: string): string {
    let value: string|undefined = process.env[key];
    if (value != undefined) {
        return value;
    } else {
        console.error("Missing environment variable: " + key);
        process.exit(1);
    }
}

export default getFromEnv; 