import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../auth/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private formBuilder: FormBuilder,private authService:AuthenticationService,private router:Router) {}

  registrationForm: FormGroup = new FormGroup({});
  isSubmitting: boolean = false;

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      name:['', Validators.required],
      email: ['', Validators.required],
      phone:['',Validators.required],
      password: ['', Validators.required],
      role:'USER'
    });
  }

  onSubmit():any{
    let data=this.registrationForm.value;
    console.log(data)
    if(this.registrationForm.valid){
      this.authService.registerNewUser(data).subscribe({
        next:()=>{
          console.log("Success")
          this.router.navigate(['/user/auth/login'])
        },
        error:(error)=>{
          console.log(error)
        }
      })
    }
  }
  
}
