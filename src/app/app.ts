import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Login } from './login/login';
import { Signup } from './signup/signup';
import { AddTask } from './add-task/add-task';

@Component({
  selector: 'app-root',
  imports: [Login, Signup, AddTask],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('sa3i_productivity_frontend');
}
