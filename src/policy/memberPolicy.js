const { errorCodes } = require('../error/errorCodes');
const { AppError, assert } = require('../root');

/**
 * @description check is logged in user status
 */
module.exports = (currentUser) => {
  assert.object(currentUser, { required: true });

  return new Promise((resolve, reject) => {
    if (currentUser.id) return resolve();
    return reject(new AppError({ ...errorCodes.NO_ANONYMOUS_ACCESS }));
  });
};