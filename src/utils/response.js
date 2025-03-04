const sendSuccessResponse = (res, status, data = null, message, token = "") => {
  if (token) {
    return res.status(status).json({
      data,
      meta: {
        code: 1,
        status,
        message: String(message).trim(),
        token,
      },
    });
  } else {
    return res.status(status).json({
      data,
      meta: {
        code: 1,
        status,
        message: String(message).trim(),
      },
    });
  }
};

const sendSuccessResponseWithPagination = (
  res,
  status,
  data = null,
  message,
  pagination
) => {
  return res.status(status).json({
    data,
    meta: {
      code: 1,
      status,
      message: String(message).trim(),
      pagination
    },
  });
};

const sendErrorResponse = (res, status, data = null, message) => {
  console.log("Error occured : ", message);
  return res.status(status).json({
    data,
    meta: {
      code: 0,
      status,
      message: String(message).trim(),
    },
  });
};

export { sendSuccessResponse, sendErrorResponse , sendSuccessResponseWithPagination};
