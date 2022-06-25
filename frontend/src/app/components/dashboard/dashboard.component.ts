import { Component, OnInit } from '@angular/core';
import { ToDoListService } from '../../services/tododata'
import { task } from '../../interfaces/index'
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  limit: number = 10
  offset: number = 0
  pageSizeOptions: number[] = [5, 10, 25, 100];
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(private todolistservice: ToDoListService, private _snackBar: MatSnackBar, private router: Router) { }

  listData: task[] = []
  length = 10
  ngOnInit(): void {
    this.getListData()
  }

  navigateToATask(id?:Number) {
    this.router.navigate([`/task/${id}`])
  }

  getListData() {
    this.todolistservice.getTasksList(this.limit, this.offset).subscribe((res) => {
      const { data, code, count } = res
      if (code == 200) {
        this.listData = data
        this.length = count
      }
    }, (error) => {
      console.log(error)
    })
  }

  deleteTask(id?: Number) {
    this.todolistservice.deleteTask(id).subscribe((res) => {
      const {code, message} = res
      if (code == 200) {
        this.openSnackBar(message, "bg-success")
        this.getListData()
      }
    }, (err) => {
      this.openSnackBar("Sorry something went wrong", "bg-danger")
    })
  }

  handlePageEvent(event: PageEvent) {
    const { pageSize, pageIndex } = event
    this.limit = pageSize
    this.offset = pageIndex
    this.getListData()
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
