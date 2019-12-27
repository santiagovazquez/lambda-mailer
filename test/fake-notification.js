const AWS = require("aws-sdk"); // must be npm installed to use
const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');
const YML_PATH = path.resolve(__dirname, '..', 'serverless.yml');

// Get document, or throw exception on error
try {
  const config = yaml.safeLoad(fs.readFileSync(YML_PATH, 'utf8'));
  const endpoint = config.custom['serverless-offline-sns']['sns-endpoint'];
  const region = config.custom.region;
  const topicName = config.custom.topicName;

  const sns = new AWS.SNS({ endpoint, region });

  sns.publish({
    Message: JSON.stringify({
        "to": "test@mailinator.com",
        "template": "test_template",
        "locals": {
          "link": "http://www.google.com"
        }
      }
    ),
    TopicArn: `arn:aws:sns:${region}:123456789012:${topicName}`,
  }, (err, resp) => {
    if (resp === null) {
      console.log("Mail not sent!", err);
    } else {
      console.log("Mail sent!");
    }
  });

} catch (e) {
  console.log("cannot read serverless.yml file!", e);
}
