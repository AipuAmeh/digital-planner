import { JwtHeader, JwtPayload, jwtDecode } from "jwt-decode";

class ClientAuthService {
  getToken() {
    return localStorage.getItem("token");
  }

  loggedIn() {
    const jwtToken = this.getToken();
    console.log(jwtToken);
    // return token && !this.isTokenExpired(token) ? true : false;
  }

  isTokenExpired(token:string) {
    const decoded = jwtDecode<JwtPayload>(token)
    console.log('DECODED EXP',decoded.exp)

    // if (decoded.exp < Date.now() / 1000) {
    //   localStorage.removeItem("token");
    //   return true;
    // }

    // return false;
  }
}

export default ClientAuthService;
