export const getAllUsers = async () => {
  const res = await fetch(`${process.env.BACKEND_URL}/api/user/`, {
    method: "GET",
    credentials: 'include',
  });
  
  return await res.json();
}

export const getUser = async (id) => {
  const res = await fetch(`${process.env.BACKEND_URL}/api/user?id=${id}`, {
    method: "GET",
    credentials: 'include',
  });
  
  return await res.json();
}