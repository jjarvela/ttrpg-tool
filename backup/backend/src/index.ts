import Express, { NextFunction, Request, Response, response } from "express";
import { api } from "./controllers/loadApi";
import { Request as request } from 'openapi-backend';

const app = Express();
app.use(Express.json());

app.use((req, res) => api.handleRequest(req as request, req, res));
api.init();
app.listen(9000, () => console.info("api listening at http://localhost:9000"));