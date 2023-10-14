import { config } from "dotenv";
import { readFileSync } from "fs";
import { IncomingMessage, Server, ServerResponse, createServer } from "http";
import { join, extname } from "path";

const contentTypes = new Map<string, string>();
contentTypes.set("html", "text/html");
contentTypes.set("css", "text/css");
contentTypes.set("js", "text/js");
contentTypes.set("png", "image/png");
contentTypes.set("jpg", "image/jpg");

export default class App {
    private PORT: number;
    private PUBLIC_DIRECTORY: string;
    private server: Server;

    constructor() {
        // Configure from environment variables
        config({ path: join(__dirname, "/.env") });

        this.PORT = process.env.PORT as unknown as number || 3000;
        this.PUBLIC_DIRECTORY = join(__dirname, "../public")

        // Configure routing
        this.server = createServer((req: IncomingMessage, res: ServerResponse) => {
            if (req.method === "GET") {
                switch (req.url) {
                    case "/":
                       res.writeHead(200, { "Content-Type": "text/html" });
                       res.write(this.getFile("landing_page.html"))
                       res.end();
                       return;
                    case "/cars":
                        res.writeHead(200, { "Content-Type": "text/html" });
                        res.write(this.getFile("cari_mobil.html"))
                        res.end();
                        res.end();
                        return;
                    default:
                        // CSS, JS, Images
                        const extension = extname("." + req.url);
                        try {
                            const contentType = contentTypes.get(extension.slice(1));
                            res.writeHead(200, { "Content-Type": contentType });
                            res.write(this.getFile(req.url!));
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

    private getFile(dir: string): Buffer {
        const filePath = join(this.PUBLIC_DIRECTORY, dir);
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


