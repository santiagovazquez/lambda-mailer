// load aws sdk
const aws = require('aws-sdk');
const base64ToS3 = require('nodemailer-base64-to-s3');
const nodemailer = require('nodemailer');
const constants = require('./constants');

// load aws config
aws.config.apiVersions = "2010-12-01";

aws.config.update({
  region: constants.REGION,
  accessKeyId: constants.ACCESS_KEY_ID,
  secretAccessKey: constants.SECRET_ACCESS_KEY,
  sessionToken: constants.SESSION_TOKEN,
});

function createTransport() {
  const transport = nodemailer.createTransport({ SES: new aws.SES() });

  if (constants.NODE_ENV === 'production') {
    transport.use(
      'compile',
      base64ToS3({
        dir: '/mailing',
        aws: {
          accessKeyId: constants.ACCESS_KEY_ID,
          secretAccessKey: constants.SECRET_ACCESS_KEY,
          sessionToken: constants.SESSION_TOKEN,
          params: { Bucket: constants.S3_BUCKET }
        },
      }),
    );
  }

  return transport;
}

module.exports = { createTransport, aws };
