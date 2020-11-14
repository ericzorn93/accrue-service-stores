import { Request, Response } from 'express';

export interface IAccrueStoresGQLContext {
  req: Request;
  res: Response;
  appName: 'accure-service-stores';
}
