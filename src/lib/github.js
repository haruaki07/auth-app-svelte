const axios = require("axios");
const qs = require("qs");

const {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GITHUB_REDIRECT_URI,
} = process.env;

const getAccessToken = async (code) => {
  try {
    const body = {
      client_id: GITHUB_CLIENT_ID,
      client_secret: GITHUB_CLIENT_SECRET,
      code: code,
    };

    const { data } = await axios.post(
      `https://github.com/login/oauth/access_token`,
      body,
      {
        headers: {
          accept: "application/json",
        },
      }
    );

    return data.access_token;
  } catch (e) {
    console.log(e);
  }
};

const getGitHubUserData = async (code) => {
  try {
    const access_token = await getAccessToken(code);

    const { data } = await axios({
      url: "https://api.github.com/user",
      method: "get",
      headers: {
        Authorization: `token ${access_token}`,
      },
    });

    if (!data.email) {
      const email = await axios({
        url: "https://api.github.com/user/emails?per_page=1",
        method: "get",
        headers: {
          Authorization: `token ${access_token}`,
        },
      });

      data.email = email.data[0].email;
    }
    return {
      name: data.name,
      email: data.email,
      photo: data.avatar_url,
    };
  } catch (e) {
    console.log(e);
  }
};

const githubLoginUrl = () => {
  const stringifiedParams = qs.stringify({
    client_id: GITHUB_CLIENT_ID,
    redirect_uri: GITHUB_REDIRECT_URI,
    scope: ["read:user", "user:email"].join(","),
    allow_signup: true,
  });

  return `https://github.com/login/oauth/authorize?${stringifiedParams}`;
};

module.exports = {
  githubLoginUrl,
  getGitHubUserData,
};
