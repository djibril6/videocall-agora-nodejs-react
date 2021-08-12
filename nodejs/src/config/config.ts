import dotenv from 'dotenv';
import Joi from 'joi';

dotenv.config({ path: '.env' });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    APP_ID: Joi.string().required().description('Agora App ID is required'),
    PRIMARY_CERTIFICATE: Joi.string().required().description('Primary Agora app certificate is required'),
    SECONDARY_CERTIFICATE: Joi.string().description('Secondary Agora app certificate'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  agora: {
    appID: envVars.APP_ID,
    primaryCertificate: envVars.PRIMARY_CERTIFICATE,
    secondaryCertificate: envVars.SECONDARY_CERTIFICATE
  }
};
export default config;
