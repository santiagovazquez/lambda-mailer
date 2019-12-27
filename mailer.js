
/**
 * Mailing service. Use this function to send an email
 * @module util/mailing_service
 */
const Email = require('email-templates');
const { createTransport } = require('./aws');
const constants = require('./constants');

function send(to, { template, locals }) {
  const transport = createTransport();

  const email = new Email({
    message: {
      from: constants.EMAIL_FROM, // sender address
    },
    transport,
    juice: true,
    juiceResources: {
      preserveImportant: true,
      webResources: {
        images: true,
        //
        // this is the relative directory to your CSS/image assets
        // and its default path is `build/`:
        //
        // e.g. if you have the following in the `<head`> of your template:
        // `<link rel="stylesheet" href="style.css" data-inline="data-inline">`
        // then this assumes that the file `build/style.css` exists
        //
        relativeTo: `${constants.TEMPLATES_DIR}/assets`,
      },
    },
  });

  return email.send({
    message: {
      to, // list of receivers
      // subject, // Subject line
    },
    template: `${constants.TEMPLATES_DIR}/${template}`,
    locals,
  });
}

module.exports = { send };
