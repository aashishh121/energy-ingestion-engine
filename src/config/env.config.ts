import { config } from 'dotenv';
import * as Joi from 'joi';
import { EnvType } from '../enums/env-type.enum';

const ENV = process.env.NODE_ENV || EnvType.PRODUCTION;
config({
    path: `./.${ENV}.env`,
});

const schema = Joi.object({
    NODE_ENV: Joi.string().valid(EnvType.DEVELOPMENT, EnvType.PRODUCTION).default(EnvType.PRODUCTION).messages({
        'string.valid': 'NODE_ENV must be either development or production',
        'string.required': 'NODE_ENV is required',
    }),
    PORT: Joi.number().default(5100),
    DB_HOST: Joi.string().required().messages({
        'string.required': 'DB_HOST is required',
    }),
    DB_PORT: Joi.number().required().messages({
        'number.required': 'DB_PORT is required',
    }),
    DB_USER: Joi.string().required().messages({
        'string.required': 'DB_USER is required',
    }),
    DB_PASSWORD: Joi.string().required().messages({
        'string.required': 'DB_PASSWORD is required',
    }),
    DB_NAME: Joi.string().required().messages({
        'string.required': 'DB_NAME is required',
    }),
}).unknown();

const { value: envVars, error } = schema.prefs({ errors: { label: 'key' } }).validate(process.env);


if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

export const envConfig = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    database: {
        host: envVars.DB_HOST,
        port: envVars.DB_PORT,
        username: envVars.DB_USER,
        password: envVars.DB_PASSWORD,
        database: envVars.DB_NAME,
    },
}; 