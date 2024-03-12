import Express, { NextFunction, Request, Response, response } from "express";

const app = Express();
app.use(Express.json());
app.listen(9000, () => console.info("api listening at http://localhost:9000"));