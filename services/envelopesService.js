const axios = require('axios');
const EnvelopeDAO = require('../dao/envelopeDAO');

exports.createEnvelope = async (documentBase64, email, name) => {
  const payload = {
    documents: [
      {
        documentBase64,
        documentId: "1",
        fileExtension: 'docx',
        name
      }
    ],
    emailSubject: 'Sign the Document',
    recipients: {
      signers: [
        {
          email,
          name,
          recipientId: "1"
        }
      ]
    },
    status: 'created'
  };

  // Send the request to DocuSign API
  const envelopeResponse = await axios.post(
    EnvelopeDAO.getEnvelopeApiUrl(),
    payload,
    { headers: EnvelopeDAO.getEnvelopeApiHeaders() }
  );

  return envelopeResponse.data;
};