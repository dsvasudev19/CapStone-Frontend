import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

// users.interface.ts
export interface User {
  id: any;
  name: string;
  email: string;
  phone: string;
  createdAt ?: Date;
  role:string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

  constructor(private userService:UserService){

  }

  users: User[] = [];

  isModalOpen = false;  

  showSuccessToast:boolean = false;

  showErrorToast:boolean = false;

  newUser = {
    name: '',
    email: '',
    phone: '',
    role: 'USER'
  };

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.resetForm();
  }

  // Reset form
  resetForm() {
    this.newUser = {
      name: '',
      email: '',
      phone: '',
      role: 'USER'
    };
  }

  loading: boolean = true;

  ngOnInit() {
    this.loadUsers()
  }
  
  loadUsers(): void {
    this.loading = true;
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
        console.log(data)
        this.loading = false;
      },
      error: (error) => {
        console.error('Error:', error);
        this.loading = false;
      },
      complete:()=>{
        this.loading=false
      }
    });
  }

  deleteUser(userId: number): void {
    this.userService.deleteUserById(userId).subscribe({
      next: () => {
        console.log("User Deleted Successfully")
        this.showSuccessToast=true;
      },
      error: (error:any) => {
        console.error('Error:', error);
        this.showErrorToast=true
      },
      complete:()=>{
        this.loadUsers();
        setTimeout(()=>{
          this.showErrorToast=false;
          this.showSuccessToast=false;
        },1500)
      }
    });
  }

 
  onSubmit() {
    if (this.newUser.name && this.newUser.email && this.newUser.phone && this.newUser.role) {
     
      this.userService.addNewUser(this.newUser).subscribe({
        next:(data)=>{
          console.log("New User Added Successfully")
          this.closeModal();
          this.showSuccessToast=true
        },
        error:(error)=>{
          console.log(error)
          this.showErrorToast=true
        },
        complete:()=>{
          this.loadUsers();
        setTimeout(()=>{
          this.showErrorToast=false;
          this.showSuccessToast=false;
        },1500)
        }
      })
    }
  }


}
