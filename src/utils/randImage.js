/**
 * random avatar by inital name
 * @param  {String} name e.g., John
 * @return {String}      url avatar
 */
module.exports = (name) => {
  const colors = ["6c5ce7", "0984e3", "00b894", "d63031", "2d3436"];
  const bgColor = colors[Math.floor(Math.random() * colors.length)];
  return `https://avatar.oxro.io/avatar.svg?name=${name}&length=1&background=${bgColor}&caps=1`;
}