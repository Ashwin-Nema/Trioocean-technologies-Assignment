import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import {MyErrorStateMatcher} from '../../utility'
import { ToDoListService } from '../../services/tododata'
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-to-do',
  templateUrl: './add-to-do.component.html',
  styleUrls: ['./add-to-do.component.css']
})
export class AddToDoComponent implements OnInit {
  selectedDate:Date | null = new Date()
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(private todolistservice: ToDoListService, private _snackBar: MatSnackBar) { }
  AddToDoForm = new FormGroup({
    selecteddate: new FormControl(''),
    title:new FormControl('', [Validators.required, Validators.maxLength(250)]),
    description:new FormControl('', [Validators.required])
  });

  ngOnInit(): void {
  }

  errorMatcher = new MyErrorStateMatcher();

  getTitle() {
    return this.AddToDoForm.get('title')
  }

  getDescription() {
    return this.AddToDoForm.get('description')
  }

  saveDetails() {
    if (this.AddToDoForm.invalid) {
      return
    }
    const {description, selecteddate, title} = this.AddToDoForm.value
    if ( description?.trim() == "" || title?.trim() == "" ) {
      return
    }
   
    const trimmedDescription = description?.trim()
    const trimmedTitle = title?.trim()
    let due_date = selecteddate
    if (typeof due_date == 'string') {
      due_date = null
    }
    const dataToSave = {
      description:trimmedDescription, title:trimmedTitle, due_date
    }

    this.todolistservice.addTask(dataToSave).subscribe({
      next:data => {
        const {code, message} = data
        const matSnackBarBackgroundClass = code == 200? "bg-success" : "bg-danger"
        this.openSnackBar(message, matSnackBarBackgroundClass)
        if (code == 200) {
          this.AddToDoForm.reset()
        }
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
}