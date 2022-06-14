export class Utils {
  loggedIn() {
    return !!JSON.parse(JSON.stringify(localStorage.getItem('token')));
  }

  getToken() {
    return localStorage.getItem('user');
  }
}
