export const saveToken = (token: String) => {
  sessionStorage.setItem('token', String(token));
};

export const getToken = () => {
  return sessionStorage.getItem('token');
};

export const logOut = () => {
  sessionStorage.clear();
};

export const localhost = () => {
  return 'http://localhost:8080/bank';
};

