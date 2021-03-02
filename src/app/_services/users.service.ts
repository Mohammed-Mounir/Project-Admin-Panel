import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../_model/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users:User[]=[];


  baseUrl = 'http://localhost:3000/';

  constructor(private httpClient: HttpClient) { }

  getAllUsers() {

    return this.httpClient.get(`${this.baseUrl}users`);

  }
  getUserById(id) {

    return this.httpClient.get(`${this.baseUrl}user/id/${id}`);

  }
  

  addUser(user: User) {

    const newUser: User = {
      // _id: user._id,
      userName: user.userName,
      email: user.email,
      age: user.age,
      phone: user.phone,
      dateOfRegister: user.dateOfRegister,
      address: user.address,
      password: user.password,
      repeatedPassword: user.repeatedPassword,

    };

   return  this.httpClient.post(`${this.baseUrl}user/register`, newUser);

  } 

  updateUser(user: User){

    const updatedUser: User = {
      _id: user._id,
      userName: user.userName,
      email: user.email,
      age: user.age,
      phone: user.phone,
      dateOfRegister: user.dateOfRegister,
      address: user.address,
      password: user.password,
      repeatedPassword: user.repeatedPassword,

    };

  return  this.httpClient.put(`${this.baseUrl}user`, updatedUser);
  }

  deleteUser(id: string) {

    // const idToBeDeleted = id;
    console.log('service', id);
    
   return this.httpClient.delete(`${this.baseUrl}user/${id}`);
  }



  SearchById(res, searchQuery) {
    const userID = searchQuery.toLowerCase();
    this.users = res;
    return this.users.filter(u => u._id.toLowerCase().includes(userID));

  }

  SearchByEmail(res, searchQuery) {
    const userAddress = searchQuery.toLowerCase();
    this.users = res;
    return this.users.filter(u => u.email.toLowerCase().includes(userAddress));

  }

  SearchByName(res, searchQuery) {
    const userNAME = searchQuery.toLowerCase();
    this.users = res;
    
    
    return this.users.filter(u => u.userName.toLowerCase().includes(userNAME));

  }


  SearchByDate(res, searchQuery) {
    
    
    let userDate = searchQuery.toLowerCase();
    this.users = res;
    // console.log(this.users);
    return this.users.filter(u =>{
      if (u.dateOfRegister == undefined || null) {
        u.dateOfRegister = ''; 
        // console.log('if', u.dateOfRegister);
    return  u.dateOfRegister.toLowerCase().includes(userDate);

      } else {
        // console.log('else', u.dateOfRegister);
        
      return  u.dateOfRegister.toLowerCase().includes(userDate);
      }
    }
    );

  }
}


