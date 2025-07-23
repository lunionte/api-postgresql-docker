import express from "express";
import { routes } from "./routes";

const app = express();

routes(app);

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
