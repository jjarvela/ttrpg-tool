import { OpenAPIBackend} from 'openapi-backend';
import { Request, Response } from "express";

const api_def = `../../../api-definition/openapi.yaml`;

export const api = new OpenAPIBackend({
  definition: api_def,
});

// return 400 when request validation fails
api.register('validationFail', (c, req: Request, res: Response) =>
  res.status(400).json({ err: c.validation.errors }),
)
// return 404 when route doesn't match any operation in openapi.yml
api.register('notFound', (c, req: Request, res: Response) =>
  res.status(404).json({ err: 'not found' }),
)