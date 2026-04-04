const API_URL = process.env.NEXT_PUBLIC_API_URL;

// LOGIN
export const loginUser = async (data) => {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

// SIGNUP
export const signupUser = async (data) => {
  const res = await fetch(`${API_URL}/api/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

// GET ARTICLES
export const getArticles = async (page = 1) => {
  const res = await fetch(`${API_URL}/api/articles?page=${page}`);
  return res.json();
};

// CREATE ARTICLE
export const createArticle = async (data, token) => {
  const res = await fetch(`${API_URL}/api/articles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return res.json();
};
