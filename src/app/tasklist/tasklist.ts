import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { TaskService } from '../services/usertasks';
import { Task } from '../models/task';
import id from '@angular/common/locales/id';
import { CommonModule } from '@angular/common';
import { AddTask } from '../add-task/add-task';

@Component({
  selector: 'app-tasklist',
  imports: [CommonModule,AddTask],
  standalone: true,
  templateUrl: './tasklist.html',
  styleUrl: './tasklist.css'
})

export class Tasklist {
  myService = inject(TaskService)
  tasks: Task[] = [];
 constructor( private ref: ChangeDetectorRef) {}

  showAddTask = false; // toggle state

  toggleAddTask() {
    this.showAddTask = !this.showAddTask;
    this.loadtasks();
  }


  ngOnInit(): void{
    this.loadtasks();
  }

  loadtasks(){
      this.myService.getTasks().subscribe({
      next: (data) => {
        console.log(data);
        this.tasks = data;
        this.ref.detectChanges()
      },
    });
  
    
  }
    updateTask(id: string, index: number) {
    this.myService.updateTask(id, { title: 'Updated Title' }).subscribe({
      next: (data) => {
        console.log(data);
        console.log(index);
        
        this.tasks[index] = data;
      },
    });
  }
    deleteTask(id: string, index: number) {
    this.myService.deleteTask(id).subscribe({
      next: (data) => {
        console.log(data);
        console.log(index);
        this.loadtasks();
      },
    });
  }
}
