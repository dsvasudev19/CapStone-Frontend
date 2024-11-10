import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-operators',
  templateUrl: './operators.component.html',
  styleUrl: './operators.component.css',
})
export class OperatorsComponent implements OnInit {
  operators: any = [];

  isUserEdit: boolean = false;

  isLoading: boolean = false;

  showSuccessToast: boolean = false;

  showErrorToast: boolean = false;

  updatingUser!:number;

  constructor(private userService: UserService) {
    this.filteredUsers = this.users;
  }

  users: any[] = [];

  filteredUsers: any[] = [];
  searchText: string = '';

  isModalOpen = false; // Modal visibility control
  newUser = {
    name: '',
    email: '',
    phone: '',
    role: 'OPERATOR',
  };

  // Open the modal
  openModal() {
    this.isModalOpen = true;
  }

  // Close the modal
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
      role: 'OPERATOR',
    };
  }

  ngOnInit(): void {
    this.getAllOperators();
  }

  filterUsers(): void {
    if (!this.searchText) {
      this.filteredUsers = this.users;
      return;
    }

    const searchLower = this.searchText.toLowerCase();
    this.filteredUsers = this.users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        user.phone.toLowerCase().includes(searchLower) ||
        user.role.toLowerCase().includes(searchLower)
    );
  }

  editUser(user: any): void {
    console.log('Editing user:', user);
    // Implement edit functionality
  }

  deleteUser(user: any): void {
    this.userService.deleteOperatorById(user.id).subscribe({
      next: () => {
        console.log('New User Added Successfully');
        this.closeModal();
        this.showSuccessToast = true;
      },
      error: (error) => {
        console.log(error);
        this.showErrorToast = true;
      },
      complete: () => {
        this.getAllOperators();
        setTimeout(() => {
          this.showErrorToast = false;
          this.showSuccessToast = false;
        }, 1500);
      },
    })
  }

  getAllOperators(): any {
    this.isLoading = true;
    this.userService.getAllOperators().subscribe({
      next: (data) => {
        console.log(data);
        this.users = data;
        this.filteredUsers = data;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  getUserById(id: number): any {
    this.isLoading = true;
    this.updatingUser=id;
    this.userService.getUserById(id).subscribe({
      next: (data) => {
        this.newUser.email = data.email;
        this.newUser.phone = data.phone;
        this.newUser.name = data.name;
        this.isUserEdit = true;
        this.openModal();
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  onSubmit() {
    if (
      this.newUser.name &&
      this.newUser.email &&
      this.newUser.phone &&
      this.newUser.role
    ) {
      if (this.isUserEdit) {
        this.userService.updateUserDetails(this.updatingUser,this.newUser).subscribe({
          next: (data) => {
            console.log('New User Added Successfully');
            this.closeModal();
            this.showSuccessToast = true;
          },
          error: (error) => {
            console.log(error);
            this.showErrorToast = true;
          },
          complete: () => {
            this.getAllOperators();
            setTimeout(() => {
              this.showErrorToast = false;
              this.showSuccessToast = false;
            }, 1500);
          },
        })
      } else {
        this.userService.addNewUser(this.newUser).subscribe({
          next: (data) => {
            console.log('New User Added Successfully');
            this.closeModal();
            this.showSuccessToast = true;
          },
          error: (error) => {
            console.log(error);
            this.showErrorToast = true;
          },
          complete: () => {
            this.getAllOperators();
            setTimeout(() => {
              this.showErrorToast = false;
              this.showSuccessToast = false;
            }, 1500);
          },
        });
      }
    }
  }
}
