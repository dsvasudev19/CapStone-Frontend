import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {

  resetPasswordForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder,private route:ActivatedRoute,private authService:AuthenticationService,private router:Router) {}

  ngOnInit(): void {
    this.resetPasswordForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      terms: ['', Validators.required],
    });

    this.route.queryParams.subscribe(params=>{
      const token=params['token']
      if(token){
        this.authService.verifyForgotPasswordToken(token).subscribe({
          next:(data)=>{
            this.resetPasswordForm.patchValue(data)
          },
          error:(error)=>{
            console.log(error)
          }
        })
      }
    })
  }

  resetPassword():any{
    const data=this.resetPasswordForm.value;
    this.route.queryParams.subscribe(params=>{
      const token=params['token']
      if(this.resetPasswordForm.valid){
        this.authService.resetPassword(token,data).subscribe({
          next:(data)=>{
            this.router.navigate(['/auth/login'])
          },
          error:(error)=>{
            console.log(error)
          }
        })
      }
    })
    
    
  }

}
