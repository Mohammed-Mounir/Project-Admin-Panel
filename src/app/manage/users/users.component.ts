import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_model/users';
import { UsersService } from 'src/app/_services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
}) 
export class UsersComponent implements OnInit {
  users;
  numOfPages: number[] = [];

  pageSize = 30;

  currentPage = 0;
  lastPage = 0;

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.usersService.getAllUsers().subscribe(
      (res) => {

        this.users = res;
        console.log(res);
        console.log('onInit', this.users.length);
        this.lastPage = this.users.length / this.pageSize;
        this.calculateNumOfPages();

      },
      (err) => {
        console.log(err);

      },
      () => { },
    );

    


  }

  delete(i) {
    console.log('component.ts', this.users[i]._id);

    // this.users.splice(i, 1);
    this.usersService.deleteUser(this.users[i]._id).subscribe(
      (res) => {
        this.usersService.getAllUsers().subscribe(
          (res) => {

            this.users = res;
          },
          (err) => {
            console.log(err);

          },
          () => { },
        );

      },
      (err) => {
        console.log(err);
        this.usersService.getAllUsers().subscribe(
          (res) => {

            this.users = res;


          },
          (err) => {
            console.log(err);

          },
          () => { },
        );
      },
      () => { },
    );
  }

  idSearch(searchquery) {
    this.usersService.getAllUsers().subscribe(
      (res) => {

        this.users = res;
        this.users = this.usersService.SearchById(res, searchquery);
        console.log('onSearchById', this.users.length);

      },
      (err) => {
        console.log(err);

      },
      () => { },
    );

  }

  emailSearch(searchquery) {
    this.usersService.getAllUsers().subscribe(
      (res) => {

        this.users = res;
        this.users = this.usersService.SearchByEmail(res, searchquery);
        console.log('onSearchByEmail', this.users.length);

      },
      (err) => {
        console.log(err);

      },
      () => { },
    );
  }

  nameSearch(searchquery) {
    this.usersService.getAllUsers().subscribe(
      (res) => {

        this.users = res;
        this.users = this.usersService.SearchByName(res, searchquery);
        console.log('onSearchByName', this.users.length);

      },
      (err) => {
        console.log(err);

      },
      () => { },
    );
  }

  dateSearch(searchquery) {
    this.usersService.getAllUsers().subscribe(
      (res) => {

        this.users = res;
        this.users = this.usersService.SearchByDate(res, searchquery);
        console.log('onSearchByDate', this.users.length);

      },
      (err) => {
        console.log(err);

      },
      () => { },
    );
  }

  getSlicedArrayOfUsers() {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    return this.users.slice(start, end);
  }

  calculateNumOfPages() {
    this.numOfPages = [];
    for (let index = 0; index < this.users.length / this.pageSize; index++) {
      this.numOfPages.push(index + 1);
    }
  }

}
