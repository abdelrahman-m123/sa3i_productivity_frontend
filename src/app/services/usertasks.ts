import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private http = inject(HttpClient);
  private URL = 'http://localhost:3000/tasks';

  getTasks(): Observable<any[]> {
    const userData = JSON.parse(localStorage.getItem("userData") || '{}');
    console.log(userData);
    
    const token = userData?._token;
    console.log(token);
    
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any>(this.URL, { headers }).pipe(
      map((response) => {
        return response.data; 
      })
    );
  }


  addTask(task: Task): Observable<Task> {
    const userData = JSON.parse(localStorage.getItem("userData") || '{}');
    console.log(userData);
    
    const token = userData?._token;
    console.log(token);
    
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post<any>(this.URL, task, {headers}).pipe(
      map((response) =>{
        console.log(response);
        return response.data.task;
        
        
      })
    );
  }
  

  updateTask(taskId: any, updatedData: any): Observable<any> {
    console.log(taskId);
    
    const userData = JSON.parse(localStorage.getItem("userData") || '{}');
    const token = userData?._token;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    console.log(updatedData);
    
    return this.http.patch<any>(`${this.URL}/${taskId}`, updatedData, { headers }).pipe(
      map((response) => response.data.task)
    );
  }

 
  deleteTask(taskId: string): Observable<any> {
    const userData = JSON.parse(localStorage.getItem("userData") || '{}');
    const token = userData?._token;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.delete<any>(`${this.URL}/${taskId}`, { headers }).pipe(
      map((response) => response.data.task)
    );
  }
  
}
