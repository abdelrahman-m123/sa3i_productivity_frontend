import { Routes } from '@angular/router';
import { Signup } from './signup/signup';
import { Login } from './login/login';
import { Tasklist } from './tasklist/tasklist';
import { Profile } from './profile/profile';

export const routes: Routes = [
    {path:"", redirectTo: "signup", pathMatch: "full"},
    {path:"signup", component: Signup},
    {path:"login", component: Login},
    {path:"tasks", component: Tasklist},
    {path:"profile", component: Profile}
];
