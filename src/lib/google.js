const { google } = require("googleapis");
const axios = require("axios");
/*******************/
/** CONFIGURATION **/
/*******************/

const googleConfig = {
  clientId: process.env.GOOGLE_CLIENT_ID, // e.g. asdfghjkljhgfdsghjk.apps.googleusercontent.com
  clientSecret: process.env.GOOGLE_CLIENT_SECRET, // e.g. _ASDFA%DFASDFASDFASD#FAD-
  redirect: process.env.GOOGLE_REDIRECT_URL, // this must match your google api settings
};

const defaultScope = [
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/userinfo.email",
];

/*************/
/** HELPERS **/
/*************/

function createConnection() {
  return new google.auth.OAuth2(
    googleConfig.clientId,
    googleConfig.clientSecret,
    googleConfig.redirect
  );
}

function getConnectionUrl(auth) {
  return auth.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: defaultScope,
  });
}

async function getAccessTokenFromCode(code) {
  const { data } = await axios({
    url: `https://oauth2.googleapis.com/token`,
    method: "post",
    data: {
      client_id: googleConfig.clientId,
      client_secret: googleConfig.clientSecret,
      redirect_uri: googleConfig.redirect,
      grant_type: "authorization_code",
      code,
    },
  });
  return data.access_token;
}

/**********/
/** MAIN **/
/**********/

/**
 * Part 1: Create a Google URL and send to the client to log in the user.
 */
const urlGoogle = () => {
  const auth = createConnection();
  const url = getConnectionUrl(auth);
  return url;
};

/**
 *
 * @param {string} code
 */
const getGoogleUserData = async (code) => {
  try {
    const access_token = await getAccessTokenFromCode(code);
    const { data } = await axios({
      url: `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`,
      method: "get",
    });
    return {
      name: data.name,
      email: data.email,
      photo: data.picture,
    };
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  getGoogleUserData,
  urlGoogle,
};
