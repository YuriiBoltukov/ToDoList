import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from 'src/app/app.component';
@Component({
  selector: 'app-task-info-modal',
  templateUrl: './task-info-modal.component.html',
  styleUrls: ['./task-info-modal.component.scss'],
})
export class TaskInfoModalComponent {
  constructor(
    public dialogRef: MatDialogRef<TaskInfoModalComponent>, //@Inject(MAT_DIALOG_DATA) public data: DialogData,
    @Inject(MAT_DIALOG_DATA) public data: Task,
  ) {}

  close() {
    this.dialogRef.close();
  }
}
