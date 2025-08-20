import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile {
  userData = JSON.parse(localStorage.getItem("userData") || '{}');
  photo = this.userData.photo;
  name = this.userData.name;
  email = this.userData.email;
}
