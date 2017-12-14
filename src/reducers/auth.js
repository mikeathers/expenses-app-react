export default (state = {}, action) => {
  switch (action.type) {
    case "LOGIN_ERROR": 
      return {
        error: action.error,
        email: action.email
      }
    case 'LOGIN':
      return {
        uid: action.uid
      };
    case 'LOGOUT':
      return {};
    default:
      return state;
  }
};
