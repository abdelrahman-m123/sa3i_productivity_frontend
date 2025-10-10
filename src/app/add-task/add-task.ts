import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Task } from '../models/task';
import { TaskService } from '../services/usertasks';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-add-task',
  imports: [ReactiveFormsModule, MatDialogModule, MatButtonModule, MatIcon, MatSelectModule, MatFormFieldModule, MatInputModule ],
  templateUrl: './add-task.html',
  styleUrl: './add-task.css',
})
export class AddTask {
  addTaskForm!: FormGroup;
  newTask!: Task;
  myService = inject(TaskService);

  constructor(private dialogRef: MatDialogRef<AddTask>) {}

  ngOnInit() {
    this.addTaskForm = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ]),
      description: new FormControl(null),
      dueDate: new FormControl(null),
      completed: new FormControl(null),
      priority: new FormControl(null),
      category: new FormControl(null),
    });
  }

  onSubmit() {
    console.log("inside onsubmit",this.addTaskForm);

    if (this.addTaskForm.invalid) {
      this.addTaskForm.markAllAsTouched();
      console.log('invalid');

      return;
    } else {
      const rawTask = this.addTaskForm.value;

      this.newTask = Object.fromEntries(
        Object.entries(rawTask).filter(([_, v]) => v != null)
      ) as unknown as Task;

      this.myService.addTask(this.newTask).subscribe({
        next: (data) => {
          console.log("inside add request",data);
          this.dialogRef.close(data);
        },
      });
      console.log(this.newTask);
    }
  }
}
