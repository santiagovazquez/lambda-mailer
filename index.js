const parseSNS = require('./parse-sns');
const mailer = require('./mailer');
const constants = require('./constants');

const sendMail = (props) => new Promise((resolve, reject) => {
  const { template, locals, to } = props;

  if (template === undefined || to === undefined || locals === undefined) {
    reject(`400 Invalid Input: ${JSON.stringify(props)}`);
  }

  if (!constants.AVAILABLE_TEMPLATES.includes(template)) {
    reject(`400 Invalid Template: ${template}`);
  }

  mailer.send(to, { template, locals })
    .then(() => {
      console.log(`an email was sent to ${to} using ${template} template with locals ${JSON.stringify(locals)}`);
      resolve();
    })
    .catch((e) => {
      console.log(`an error has occurred when sending an email to ${to} using ${template} template with locals ${JSON.stringify(locals)}`);
      reject(e);
    });
});

exports.handler = async (event, context, callback) => {
  const notifications = parseSNS(event);
  const promises = notifications.map(n => sendMail(n));

  return Promise.all(promises);
};
