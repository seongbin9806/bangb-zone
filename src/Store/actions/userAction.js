export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const LOGIN = 'LOGIN';

export const login = body => {
  return {
    type: LOGIN_USER,
    payload: body,
  };
};

export const logout = () => {
  return {
    type: LOGOUT_USER,
  };
};

export function setLogedin(val) {
  return {
    type: LOGIN,
    value: val,
  };
}
