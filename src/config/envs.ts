import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  PRODUCTS_MICROSERVICE_HOST: string;
  PRODUCTS_MICROSERVICE_PORT: number;
  ORDERS_MICROSERVICE_HOST: string;
  ORDERS_MICROSERVICE_PORT: number;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    PRODUCTS_MICROSERVICE_HOST: joi.string().required(),
    PRODUCTS_MICROSERVICE_PORT: joi.number().required(),
    ORDERS_MICROSERVICE_HOST: joi.string().required(),
    ORDERS_MICROSERVICE_PORT: joi.number().required(),
  })
  .unknown(true);

const validationSchema = envsSchema.validate(process.env);
const error: joi.ValidationError | undefined = validationSchema.error;
const value: EnvVars = validationSchema.value as EnvVars;

if (error) {
  throw new Error('Config Validation error: ' + error.message);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  products_microservice_host: envVars.PRODUCTS_MICROSERVICE_HOST,
  products_microservice_port: envVars.PRODUCTS_MICROSERVICE_PORT,
  orders_microservice_host: envVars.ORDERS_MICROSERVICE_HOST,
  orders_microservice_port: envVars.ORDERS_MICROSERVICE_PORT,
};
