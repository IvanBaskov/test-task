const IRC = {
  OK: {
    code: 2000,
    responseCode: 200,
    message: 'OK'
  },

  BAD_REQUEST: {
    code: 4000,
    responseCode: 400,
    message: 'BAD_REQUEST'
  },
  NOT_FOUND: {
    code: 4404,
    responseCode: 404,
    message: 'NOT_FOUND'
  },

  INTERNAL_SERVER_ERROR: {
    code: 5000,
    responseCode: 500,
    message: 'INTERNAL_SERVER_ERROR'
  }
};

export default IRC;
