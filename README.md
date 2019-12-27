# Lambda Mailer

Serverless project to send professional email templates with NodeJS.

We make use of AWS SNS, AWS Lambda functions, node-mailer and email-templates.

## Setup
```
# install serverless framework
npm install -g serverless
# setup AWS user access (IAM): note that you will need different permissions for each action. 
serverless config credentials --provider aws --key YOUR_KEY_HERE --secret YOUR_SECRET_HERE
```


## Development
```
# run the offline sns mailer daemon
npm start

# in another tab, run
npm run send-mail

```

## Production
```
# to deploy you must have AWS valid creds
npm run deploy
# to remove deploy
npm run remove
```


