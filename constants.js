const path = require('path');
const { readdirSync } = require('fs');

// amazon lambda env variables (provided by lambda context)
// @see https://docs.aws.amazon.com/lambda/latest/dg/lambda-environment-variables.html
const REGION = process.env.AWS_REGION; // region where lambda is being executed
const ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
const SESSION_TOKEN = process.env.AWS_SESSION_TOKEN;

// user-defined env variables
const S3_BUCKET = process.env.S3_BUCKET;
const TEMPLATES_DIR = path.resolve(__dirname, 'templates');
const AVAILABLE_TEMPLATES = readdirSync(TEMPLATES_DIR, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory() && dirent.name !== 'assets')
  .map(dirent => dirent.name);
const TOPIC_NAME = process.env.TOPIC_NAME;
const TOPIC_ARN = process.env.TOPIC_ARN;
const EMAIL_FROM = process.env.EMAIL_FROM;
const NODE_ENV = process.env.NODE_ENV;

module.exports = {
  REGION,
  ACCESS_KEY_ID,
  SECRET_ACCESS_KEY,
  SESSION_TOKEN,
  S3_BUCKET,
  AVAILABLE_TEMPLATES,
  TEMPLATES_DIR,
  TOPIC_NAME,
  TOPIC_ARN,
  EMAIL_FROM,
  NODE_ENV,
};
