const baseURL = 'http://localhost:1234'
export const logIn = async (email, password) => {
  const body = JSON.stringify({ email, password });
  const response = await fetch(`${baseURL}/auth/login`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
    });
  return await response.json();
};

export const signUp = async (
  name, lastname, email, password
) => {
  const body = JSON.stringify({
    name, lastname, email, password,
  });
  const response = await fetch(`${baseURL}/auth/registration`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });
  return await response.json();
};

export const  auth = async () => {
  const response = await fetch(`${baseURL}/auth`,
    { method: 'GET', headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
  return response.json();
};

export const editUser = async (
  id, name, lastname, email
) => {
  const body = JSON.stringify({
    name, lastname, email,
  });
  const response = await fetch(`${baseURL}/user/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  })
  return response.json();
}
export const createPost = async (
  title, text, id
) => {
  const body = JSON.stringify({
    title, text, id,
  });
  const response = await fetch(`${baseURL}/post`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  })
  return response.json();
}

export const getAllPosts = async () => {
  const response = await fetch(`${baseURL}/post`,
    { method: 'GET', });
  return response.json();
}
