import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { TaskService } from '../services/usertasks';
import { Task } from '../models/task';
import id from '@angular/common/locales/id';
import { CommonModule } from '@angular/common';
import { AddTask } from '../add-task/add-task';
import { FormGroup } from '@angular/forms';
import { UpdateTask } from '../update-task/update-task';

@Component({
  selector: 'app-tasklist',
  imports: [CommonModule,AddTask,UpdateTask],
  standalone: true,
  templateUrl: './tasklist.html',
  styleUrl: './tasklist.css'
})

export class Tasklist {
   
  myService = inject(TaskService)
  tasks: Task[] = [];
  addTaskForm !: FormGroup;
 constructor( private ref: ChangeDetectorRef) {}

  showAddTask = false;
  showUpdateTask = false; // toggle state
  editId!: string;


  toggleAddTask() {
    this.showAddTask = !this.showAddTask;
    this.loadtasks();
  }
  toggleUpdateTask(){
    this.showUpdateTask = !this.showUpdateTask;
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
    // this.myService.updateTask(id, { title: 'Updated Title' }).subscribe({
    //   next: (data) => {
    //     console.log(data);
    //     console.log(index);
        
    //     this.tasks[index] = data;
    //   },
    // });
      localStorage.setItem("editId", id);
      this.showUpdateTask = true;
      this.loadtasks();

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
