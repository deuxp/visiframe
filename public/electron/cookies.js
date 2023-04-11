//////////////////////
// Session-cookies //
////////////////////

function splitCookie(string) {
  let partition = string.indexOf("=");
  let end = string.indexOf(";");
  let name = string.slice(0, partition);
  let value = string.slice(partition + 1, end);

  return { name, value };
}

// Set a cookie with the given cookie data;
// may overwrite equivalent cookies if they exist.
function setCookie(sesh, url, rawCookie) {
  const { name, value } = splitCookie(rawCookie);
  const cookie = {
    url,
    name,
    value,
    httpOnly: true,
    path: "/",
    secure: true,
    sameSite: "strict",
    expirationDate: 1742054595000,
  };
  sesh.cookies.set(cookie).then(
    () => {
      console.log(`\n${name} cookie is set\n`);
    },
    error => {
      console.error(error);
    }
  );
}
module.exports = { setCookie };

//params needed url::deploybase, sesh
