export default function authHeader() {
  const userToken = JSON.parse(localStorage.getItem("userToken"));

  if (userToken) {
    return { "x-access-token": userToken };
  } else {
    return {};
  }
}
