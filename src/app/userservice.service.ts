import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../config/config';
@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  constructor(private http: HttpClient) { }
  login(userDetails: any) {
    const data = {
      username: userDetails.name,
      password: userDetails.password
    }
    return this.http.post(config.URL + `/user/login`, data)
  }
  getUsers() {
    return this.http.get(config.URL + `/user`)
  }
  getUserQuestions(username: String) {
    return this.http.get(config.URL + `/post/${username}`)
  }
  register(userDetails: any) {
    const data = {
      email: userDetails.email,
      username: userDetails.name,
      password: userDetails.password
    }
    console.log(config.URL)
    return this.http.post(config.URL + `/user/`, data)

  }
  addUser(userDetails: any) {
    const data = {
      email: userDetails.email,
      username: userDetails.username,
      password: userDetails.password,
      role: 'ADMIN'
    }
    return this.http.post(config.URL + `/user/`, data)
  }
  isUserLoggedIn() {
    return !(localStorage.getItem('token') === null)
  }
  updateScore(username: String, Score: Number) {
    const data = {
      username: username,
      score: Score
    }
    return this.http.put(config.URL + `/user/`, data)
  }
}
