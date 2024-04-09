import { JwtPayload, jwtDecode } from "jwt-decode";

class ClientAuthService {
  getToken() {
    return localStorage.getItem("token");
  }

  loggedIn() {
    const jwtToken = this.getToken();
    return jwtToken && !this.isTokenExpired(jwtToken) ? true : false;
  }

  isTokenExpired(token:string) {
    const decoded = jwtDecode<JwtPayload>(token)

    if (decoded && decoded.exp !== undefined) {
      console.log('accessed.')
    } else {
      return console.error('exp undefined');
    }
    
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem("token");
      return true;
    } 

    return false;
  }
}

const authInstance = new ClientAuthService(); 

export default authInstance;
