import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const authHeader = async () => {
  const user = await cookies.get("user");
  if (user) {
    return {
      "Authorization": `Bearer ${user.token}`
    }
  } else {
    return { 

    }
  }
}