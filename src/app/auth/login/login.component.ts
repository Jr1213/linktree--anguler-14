import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorgeService } from 'src/app/services/local-storge.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private _auth:AuthService,
    private _storage :LocalStorgeService
  ) { }

  ngOnInit(): void {
  }

  usernameFoucsed:boolean = false
  passwordFoucsed:boolean = false

  loginForm = new FormGroup({
    email:new FormControl('',[Validators.required,Validators.minLength(5)]),
    password:new FormControl('',[Validators.required,Validators.minLength(8)])
  })

  url:string = 'Login'


  error:boolean = false

  login():void {
    this.error = false
    this._auth.post(this.url,this.loginForm.value).subscribe({
      next:(data)=>{
        this._storage.setToken(data.token)
        
      },error:(err)=>{
        console.log(err);
        
        if(err.status == 403)
        {
          this.error = !this.error
        } else {
          alert('try again later')
        }
      }
    })
  }



}
