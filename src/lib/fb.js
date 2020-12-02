const axios = require("axios");
const qs = require("qs");

const facebookLoginUrl = () => {
  const stringifiedParams = qs.stringify({
    client_id: process.env.FACEBOOK_APP_ID,
    redirect_uri: process.env.FACEBOOK_APP_REDIRECT,
    scope: ["email", "user_friends"].join(","),
    response_type: "code",
    auth_type: "rerequest",
    display: "popup",
  });

  return `https://www.facebook.com/v8.0/dialog/oauth?${stringifiedParams}`;
};

async function getAccessTokenFromCode(code) {
  const { data } = await axios({
    url: "https://graph.facebook.com/v8.0/oauth/access_token",
    method: "get",
    params: {
      client_id: process.env.FACEBOOK_APP_ID,
      client_secret: process.env.FACEBOOK_APP_SECRET,
      redirect_uri: process.env.FACEBOOK_APP_REDIRECT,
      code,
    },
  });
  return data.access_token;
}

const getFacebookUserData = async (code) => {
  const access_token = await getAccessTokenFromCode(code);
  const { data } = await axios({
    url: "https://graph.facebook.com/me",
    method: "get",
    params: {
      fields: [
        "id",
        "email",
        "first_name",
        "last_name",
        "picture.width(200)",
      ].join(","),
      access_token,
    },
  });
  return {
    name: `${data.first_name} ${data.last_name}`,
    email: data.email,
    photo: data.picture.data.url,
  };
};

module.exports = {
  facebookLoginUrl,
  getFacebookUserData,
};
