import fetch from 'axios';

const API_URL = '';
export default class {
  static async login(iemail, ipassword) {
    await fetch.post(API_URL + '/login', {
      email: iemail,
      password: ipassword
    })
    .then((res) => {
      return res.json();
    })
    .catch((error) => {
      return null;
    });
  }

  static async register(iemail, ipassword) {
    await fetch.post(API_URL + '/register', {
      email: iemail,
      password: ipassword
    })
    .then((res) => {
      return res.json();
    })
    .catch((error) => {
      return null;
    });
  }
}
