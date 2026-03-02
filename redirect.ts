import Server from "https://cdn.jsdelivr.net/gh/lumeland/lume@3.2.1/core/server.ts";

const server = new Server();

server.use(() => Response.redirect("https://lume.land"));

server.start();
