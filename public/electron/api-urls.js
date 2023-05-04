///////////////
// API URLS //
/////////////

const deployBase = "https://visualizer-server-production.up.railway.app";
// const deployBase = "http://localhost:8888";

const refresh = `${deployBase}/api/access/refresh`;
const access = `${deployBase}/api/access`;
const login = `${deployBase}/api/user/login`;
const register = `${deployBase}/api/user/register`;
const reset = `${deployBase}/api/reset`;
const newPassword = `${deployBase}/api/reset/new-password`;

module.exports = {
  deployBase,
  refresh,
  access,
  login,
  register,
  reset,
  newPassword,
};
