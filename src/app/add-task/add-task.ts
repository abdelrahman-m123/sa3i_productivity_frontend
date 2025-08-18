import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-add-task',
  imports: [ReactiveFormsModule],
  templateUrl: './add-task.html',
  styleUrl: './add-task.css'
})
export class AddTask {
   addTaskForm !: FormGroup;

  ngOnInit() {
    this.addTaskForm = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
      description: new FormControl(null),
      dueDate: new FormControl(null),
      completed: new FormControl(null),
      priority: new FormControl(null),
      category: new FormControl(null)
    });
  }

   
  
   onSubmit() {
      console.log(this.addTaskForm);
      
      if (this.addTaskForm.invalid){
        this.addTaskForm.markAllAsTouched;
        return
      }
      
    }
}
