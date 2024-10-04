import { Component, NgModule } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FloatLabelModule, InputTextModule, FormsModule, ButtonModule, NgIf, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'register-signin';

  form: any;
  username: string = '';
  password: any = '';
  showPassword: boolean = false;

  onSubmit(form: NgForm) {
    if (form.valid) {

      //For localStorage
      localStorage.setItem('username', this.username);
      localStorage.setItem('password', this.password);

      //retrieve existing users from localStorage
      let users = this.getUsersFromStorage();

      //add new user to the array

      const newUser = {
        username: this.username,
        password: this.password
      };

      users.push(newUser);

      //store the updated array back into localStorage
      this.saveUsersToStorage(users);

      console.log('submitted', form.value)
      form.reset()
    }
    else {
      console.log('Form is invalid');
    }
  }
  //retrieve users from localStorage
  getUsersFromStorage(): { username: string; password: string }[] {
    const userString = localStorage.getItem('users');
    return userString ? JSON.parse(userString) : [];
  }

  //save the users array back to localStorage
  saveUsersToStorage(users: { username: string; password: string }[]) {
    localStorage.setItem('users', JSON.stringify(users));
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  ngOnInIt() {
    //retrive from localStorage
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    //if values exist in localStorage assign to the component properties
    if (storedUsername && storedPassword) {
      this.username = storedUsername;
      this.password = storedPassword
    }
  }

}
