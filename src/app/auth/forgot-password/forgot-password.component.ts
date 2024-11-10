import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup = new FormGroup({});

  isSubmitting: boolean = false;

  constructor(private formBuilder: FormBuilder,private authService:AuthenticationService,private router:Router) {}

  ngOnInit(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', Validators.required],
      terms: ['', Validators.required],
    });
  }

  onSubmit(): void {
    // `/auth/reset-password?token=${res.data.token}`
    const data=this.forgotPasswordForm.value;
    this.authService.forgotPassword(data).subscribe({
      next:(data)=>{
        console.log("Successfully Generated Resetting Password Token")
        this.router.navigate(['/auth/reset-password'], { queryParams: { token: data.token } });
      },
      error:(error)=>{
        console.log(error)
      }
    })
  }
}
