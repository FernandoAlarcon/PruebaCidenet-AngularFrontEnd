import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Users } from '../models/Users';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  API_URI = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  getUsers(text: string) {
    return this.http.get(`${this.API_URI}/users`, {params : {data:text}});
  }

  getCliente(id: string) {
    return this.http.get(`${this.API_URI}/users/${id}`);
  }

  deleteUsers(id_: string) {
    return this.http.delete(`${this.API_URI}/users`, {params : {id:id_}});
  }

  saveUsers(Users: Users): Observable<Users> {
    return this.http.post(`${this.API_URI}/users`, Users);
  }

  updateUsers(id: any, updatedUsers: Users): Observable<Users> {
    return this.http.put(`${this.API_URI}/users/${id}`, updatedUsers);
  }

}
