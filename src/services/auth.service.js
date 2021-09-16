import axios from "axios";

const API_URL = "https://193.162.143.184/api/a/";

class AuthService {
  login(email, password) {
    const data = {
      email,
      password
    }
    console.log(data);
    return fetch(API_URL + "auth",{
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
              'Content-Type': 'application/json' 
          }
      })
      .then(function(response) {
        return response.json()
      })
      .then(elem => {
        if (elem.access_token) {

          const access_token = elem.access_token;
          console.log(elem.access_token);
          localStorage.setItem("user", access_token);
        }
        return axios.get(API_URL + "users/me", { headers: {"Authorization" : `Bearer ${localStorage.getItem("user")}`} })
        .then(response => {
          localStorage.setItem("user_info", JSON.stringify(response.data))
        });
      });
  }

  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("user_info");
  }

  register(nickname, email, password, password2) {
    const data = {
      nickname,
      email,
      password,
      password2,
    }
    console.log(JSON.stringify(data))
    return fetch(API_URL + "users/register",{
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json' 
            }
        })
        .then(function(response) {
          return response.json()
        })
        .then(elem => {
            console.log(elem)
        });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user_info"));
  }
}

export default new AuthService();
