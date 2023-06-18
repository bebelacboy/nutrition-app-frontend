export const AuthHeader = async () => {
  const user = await JSON.parse(localStorage.getItem("user"));
  if (user) {
    return {
      "Authorization": `Bearer ${user.accessToken}`
    }
  } else {
    return {
      
    }
  }
}