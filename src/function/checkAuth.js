import jwtDecode from 'jwt-decode';

export const checkAuth = () => {
    const token = localStorage.getItem("FBIDToken");
    if( token ) {
      const decodedToken = jwtDecode(token);
      if( decodedToken.exp * 1000 < Date.now() ) {
        return false
      }
      else {
       return true
      }
    }
    else {
      return false
    }
}