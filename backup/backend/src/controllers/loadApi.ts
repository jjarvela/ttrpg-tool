import { OpenAPIBackend } from "openapi-backend";
import { Request, Response } from "express";
import Ajv from "ajv";
import addFormats from "ajv-formats";

const base_dir = process.cwd();
const api_def = `${base_dir}/../api-definition/openapi.yaml`;

const ajv = new Ajv();
ajv.addVocabulary(["example", "content"]);
addFormats(ajv);

export const api = new OpenAPIBackend({
  definition: api_def,
  customizeAjv: () => ajv,
});

// return 400 when request validation fails
api.register("validationFail", (c, req: Request, res: Response) =>
  res.status(400).json({ err: c.validation.errors }),
);
// return 404 when route doesn't match any operation in openapi.yml
api.register("notFound", (c, req: Request, res: Response) =>
  res.status(404).json({ err: "not found" }),
);
