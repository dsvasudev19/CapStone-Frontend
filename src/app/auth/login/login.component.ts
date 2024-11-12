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
  showErrorToast:boolean = false;
  showSuccessToast:boolean = false;
  successMessage:string="";
  errorMessage:string="";

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
          console.log("Success")
          if(data.role === "USER"){
            this.showErrorToast=true;
            this.errorMessage="You are Not Authorized to access this resources."
            setTimeout(()=>{
              localStorage.setItem("auth",data.token)
              this.router.navigate(['/user/profile'])
            },1500)
          }
          this.router.navigate(['/admin/dashboard'])
        },
        error:(error)=>{
          console.log(error)
          this.showErrorToast=true;
          this.errorMessage=error.message
        },
        complete:()=>{
          setTimeout(()=>{
            this.showErrorToast=false;
            this.showSuccessToast=false;
          },1500)
        }
      })
    }
  }



}
