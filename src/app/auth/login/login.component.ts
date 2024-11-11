import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{


  loginForm:FormGroup=new FormGroup({})
  isSubmitting:boolean=false;

  constructor(private formBuilder:FormBuilder,
    private authService:AuthenticationService,private router:Router){}


  ngOnInit(): void {
    this.loginForm=this.formBuilder.group({
      username:['',Validators.required],
      password:['',Validators.required]
    })
  }

  onSubmit():any{
    let data=this.loginForm.value;
    if(this.loginForm.valid){
      this.authService.login(data).subscribe({
        next:(data)=>{
          console.log(data)
          localStorage.setItem("__auth",data.token)
          this.router.navigate(['/admin/dashboard'])
          console.log("Success")
        },
        error:(error)=>{
          console.log(error)
        }
      })
    }
  }



}
