import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { MyErrorStateMatcher } from '../../utility'
import { ToDoListService } from '../../services/tododata'
import { Router, ActivatedRoute } from '@angular/router';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
@Component({
  selector: 'app-taskdetails',
  templateUrl: './taskdetails.component.html',
  styleUrls: ['./taskdetails.component.css']
})
export class TaskdetailsComponent implements OnInit {
  taskID:string = ''
  selectedDate: Date | null = new Date()
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(private todolistservice: ToDoListService, private _snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router) { }
  EditTaskForm = new FormGroup({
    selecteddate: new FormControl(''),
    title: new FormControl('', [Validators.required, Validators.maxLength(250)]),
    description: new FormControl('', [Validators.required])
  });

  ngOnInit(): void {
    this.taskID = this.route.snapshot.paramMap.get("id") || ""
    this.getDataForTaskID(this.taskID)
  }

  getDataForTaskID(taskID:string) {
    this.todolistservice.getTaskDataByID(taskID).subscribe({
      next: res => {
        const { code, data } = res
        if (code == 200) {
          const {title, description, due_date} = data[0]
    
          this.EditTaskForm.setValue({
            selecteddate:due_date,
            title:title,
            description:description
          })
        }
      },
      error: () => {
        this.openSnackBar("Sorry data does not exists for the given ID", "bg-danger")
        setTimeout(() => {
          this.router.navigate([`/`])
        }, 2000);
      }
    })
  }


  errorMatcher = new MyErrorStateMatcher();

  getTitle() {
    return this.EditTaskForm.get('title')
  }

  getDescription() {
    return this.EditTaskForm.get('description')
  }

  saveDetails() {
    if (this.EditTaskForm.invalid) {
      return
    }
    const { description, selecteddate, title } = this.EditTaskForm.value
    if (description?.trim() == "" || title?.trim() == "") {
      return
    }

    const trimmedDescription = description?.trim()
    const trimmedTitle = title?.trim()
    let due_date = selecteddate
    if (typeof due_date == 'string') {
      due_date = null
    }
    const dataToSave = {
      description: trimmedDescription, title: trimmedTitle, due_date
    }

    this.todolistservice.updateTask(this.taskID, dataToSave).subscribe({
      next: data => {
        const { code, message } = data
        const matSnackBarBackgroundClass = code == 200 ? "bg-success" : "bg-danger"
        this.openSnackBar(message, matSnackBarBackgroundClass)
        
      },
      error: () => {
        this.openSnackBar("Sorry something went wrong", "bg-danger")
      }
    })
  }

  openSnackBar(message: string, matBackgroundClass: string) {
    this._snackBar.open(message, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 2000,
      panelClass: [matBackgroundClass]
    });
  }

  unSelectDate() {
    this.EditTaskForm.patchValue({
      selecteddate:null
    })
  }

}
