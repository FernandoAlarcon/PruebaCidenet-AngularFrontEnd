import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { Users } from 'src/app/models/Users';

import { UsersComponent } from '../users/users.component';


@Component({
  providers:[UsersComponent],
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {

  lastId : any = '';

  user: any = {
    id:'',
    name:'',
    lastname:'',
    email:'',
    password:'',
    server:'',
    created_at:''
  };
 
  busquedad = '';


  constructor(private UserFunction: UsersComponent,
              private usersService: UsersService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {}

  ngOnInit() {}

  NuevosClientes(): void {

    if(this.user.email == ""){
      this.GenerateEmail()
    }else{

      delete this.user.id;
      this.user.created_at = new Date();
      
      this.usersService.saveUsers(this.user)
      .subscribe(
        res => {
  
          //$('#NuevoCliente').modal('hide');
          this.UserFunction.ListUsers();
          this.user.id        = '';
          this.user.name      = '';
          this.user.lastname  = '';
          this.user.email     = '';
          this.user.password  = '';
          this.router.navigate(['/users']);
        },
        err => console.log(err)
      );

    }
  }

  eliminarDiacriticos(texto:any) :void {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g,"");
  }

  GenerateEmail(): void {
    if( this.user.name == "" || this.user.lastname == ""  || this.user.server == "" ){
      alert('The fields cant be empty');
    }else{ 

      let date = new Date();

      let day     = date.getDate();
      let month   = date.getMonth() + 1;
      let year    = date.getFullYear();
      let hours   = date.getHours()
      let minutes = date.getMinutes()
      let seconds = date.getSeconds();


      let lastId = this.UserFunction.LastId;
          //console.log({lastId})
      let name     = this.user.name.toString();
          name     = name.normalize('NFD').replace(/[\u0300-\u036f]/g,"").toUpperCase().trim();
      let lastname = this.user.lastname.toString();;
          lastname = lastname.normalize('NFD').replace(/[\u0300-\u036f]/g,"").toUpperCase().trim();
      
      let value  = `${day}${month}${year}${hours}${minutes}${seconds}`;
      
      this.user.email = name +'.'+ lastname +'.'+ lastId+value + '@' + this.user.server

      console.log(this.user.email);

      }
  }
}
