import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { JoinError } from 'src/app/interface/auth/joinError';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorgeService } from 'src/app/services/local-storge.service';



@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss']
})
export class JoinComponent implements OnInit {

  constructor(
    private _auth:AuthService,
    private _storage:LocalStorgeService
  ) { }

  ngOnInit(): void {
  
  }

  url:string = 'Auth'

  joinErrors:JoinError = {}

  joinForm = new FormGroup({
    name:new FormControl('',[Validators.required , Validators.minLength(5)]),
    email:new FormControl('',[Validators.required , Validators.minLength(5)]),
    username:new FormControl('',[Validators.required , Validators.minLength(5)]),
    phone:new FormControl('',[Validators.required , Validators.minLength(5)]),
    password:new FormControl('',[Validators.required , Validators.minLength(8)]),
    password_confirmation:new FormControl('',[Validators.required , Validators.minLength(8)])
  })
  
  usernameFoucsed:boolean = false
  passwordFoucsed:boolean = false
  nameFoucsed:boolean = false
  emailFoucsed:boolean = false
  phoneFoucsed:boolean = false
  passwordConfirmationFoucsed:boolean = false

  createAccount():void {
    this.joinErrors = {}
  
    this._auth.post(this.url,this.joinForm.value).subscribe({
      next:(response) => {
        // console.log(response);
        this._storage.setToken(response.token)
      },error:(err)=> {
        console.log(err);
        if(err.status == 422){
          this.joinErrors = err.error.errors
        }else {
          alert('unexpected error happend during the process try again later' )
        }
      },
    })
  }



}
