import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-task-info-modal',
  templateUrl: './task-info-modal.component.html',
  styleUrls: ['./task-info-modal.component.scss'],
})
export class TaskInfoModalComponent {
  constructor(
    public dialogRef: MatDialogRef<TaskInfoModalComponent> //@Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  close() {
    this.dialogRef.close();
  }
}
