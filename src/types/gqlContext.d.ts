import { Request, Response } from 'express';

export interface IGQLContext {
  req: Request;
  res: Response;
  appName: 'accure-service-stores';
}
