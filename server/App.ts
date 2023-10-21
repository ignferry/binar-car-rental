import { config } from "dotenv";
import { readFileSync } from "fs";
import { IncomingMessage, Server, ServerResponse, createServer } from "http";
import { join, extname } from "path";
import { parse } from "url";

const contentTypes = new Map<string, string>();
contentTypes.set("html", "text/html");
contentTypes.set("css", "text/css");
contentTypes.set("js", "text/js");
contentTypes.set("png", "image/png");
contentTypes.set("jpg", "image/jpg");

export default class App {
    private PORT: number;
    private PUBLIC_DIRECTORY: string;
    private DATA_DIRECTORY: string;
    private server: Server;

    constructor() {
        // Configure from environment variables
        config({ path: join(__dirname, "/.env") });

        this.PORT = process.env.PORT as unknown as number || 3000;
        this.PUBLIC_DIRECTORY = join(__dirname, "..", "public");
        this.DATA_DIRECTORY = join(__dirname, "..", "data");

        // Configure routing
        this.server = createServer((req: IncomingMessage, res: ServerResponse) => {
            if (req.method === "GET") {
                switch (parse(req.url!).pathname) {
                    case "/":
                       res.writeHead(200, { "Content-Type": "text/html" });
                       res.write(this.getStaticFile("landing_page.html"))
                       res.end();
                       return;
                    case "/cars":
                        res.writeHead(200, { "Content-Type": "text/html" });
                        res.write(this.getStaticFile("cari_mobil.html"));
                        res.end();
                        return;
                    case "/data/cars":
                        res.writeHead(200, { "Content-Type": "application/json" });
                        res.write(this.getDataFile("cars.min.json"));
                        res.end();
                        return;
                    default:
                        // CSS, JS, Images
                        const extension = extname("." + req.url);
                        try {
                            const contentType = contentTypes.get(extension.slice(1));
                            res.writeHead(200, { "Content-Type": contentType });
                            res.write(this.getStaticFile(req.url!));
                        } catch {
                            res.writeHead(404);
                            res.end("Not Found");
                            return;
                        }
                        
                        res.end();
                }
            } else {
                res.writeHead(404);
                res.end("Not Found");
            }
        });
    }

    private getStaticFile(dir: string): Buffer {
        const filePath = join(this.PUBLIC_DIRECTORY, dir);
        return readFileSync(filePath, {
            flag: "r"
        });
    }

    private getDataFile(dir: string): Buffer {
        const filePath = join(this.DATA_DIRECTORY, dir);
        return readFileSync(filePath, {
            flag: "r"
        });
    }

    public listen() {
        this.server.listen(this.PORT, () => {
            console.log(`Server is running at port ${this.PORT}`);
        });
    }
}


