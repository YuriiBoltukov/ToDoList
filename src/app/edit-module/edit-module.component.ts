import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from '../app.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-module',
  templateUrl: './edit-module.component.html',
  styleUrls: ['./edit-module.component.scss']
})
export class EditModuleComponent {
  /**
   * For save form state
   * Fot getting form data
   */
  taskForm = {
    title: '',
    description: '',
  };

  constructor(
    public dialogRef: MatDialogRef<EditModuleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task,
    private readonly snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.taskForm.title = this.data.name;
    this.taskForm.description = this.data.description;
  }

  close() {
    this.dialogRef.close();
  }

  edit() {
    if(this.taskForm.title && this.taskForm.description) {
      this.data.name = this.taskForm.title;
      this.data.description = this.taskForm.description;
      this.dialogRef.close(this.data);
    } else this.showToastMessage();
  }

  /**
   * method for showing message
   */
  showToastMessage(): void {
    this.snackBar.open('All form fields must be completed', 'Understand', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
