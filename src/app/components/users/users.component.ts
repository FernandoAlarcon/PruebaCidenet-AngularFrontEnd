import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UsersService } from 'src/app/services/users.service';
import { Users } from 'src/app/models/Users';

@Component({
  selector: 'app-Users',
  templateUrl: './Users.component.html',
  styleUrls: ['./Users.component.css']
})
export class UsersComponent implements OnInit {
  

  LastId : any = '';

  user: Users = {
    id:'',
    name:'',
    lastname:'',
    email:'',
    password:''
  };

  InfoUsers: any = [];
  busquedad = '';


  constructor(private userService: UsersService , private activatedRoute: ActivatedRoute) {}
  async ngOnInit() {
    await this.ListUsers();
    this.LastId = this.InfoUsers[0].id_;
  }

  DataChange(UserClient: Users): void {
    this.user.id       = UserClient.id;
    this.user.name     = UserClient.name;
    this.user.lastname = UserClient.lastname;
    this.user.email    = UserClient.email;
    this.user.password = UserClient.password;
  }

  UpdateCliente(): void {
    this.userService.updateUsers( this.user.id, this.user).subscribe(
      res => {
        //$('#EditarCliente').modal('hide');
        this.ListUsers();
        this.user.id        = '';
        this.user.name      = '';
        this.user.lastname  = ''; 
        this.user.email     = '';
        this.user.password  = '';
     }, (err) => console.error(err)
    );
  }

  DeleteClient(DataUser: any): void {
    if(confirm('Seguro que deseas eliminar')){
      this.userService.deleteUsers(DataUser.id_)
      .subscribe(
        res => {
           this.ListUsers();
        }, (err) => console.error(err)
      );
    }
  }

  ListUsers(): void {
    this.userService.getUsers(this.busquedad)
    .subscribe(
      res => {
        console.log({res});
        this.InfoUsers = res; 
         
      },
      (err) => console.error(err)
    );
  }
}
