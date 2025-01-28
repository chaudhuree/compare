import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
        cookies: req.cookies,
      });

      req.body = validatedData.body;
      req.query = validatedData.query;
      req.params = validatedData.params;
      
      return next();
    } catch (error) {
      next(error);
    }
  };
};

export default validateRequest;
