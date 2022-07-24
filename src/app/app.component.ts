//@ts-check
import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { TaskInfoModalComponent } from './component/task-info-modal/task-info-modal.component';
import { v4 as uuidv4 } from 'uuid';
import { MatDialog } from '@angular/material/dialog';
import { formatDate } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditModuleComponent } from './edit-module/edit-module.component';

/**
 * Description/interface/plan of task (only one task)
 */
export interface Task {
  name: string;
  id: string;
  description: string;
  date: string; //dd.mm.YYYY
}

/**
 * It's decorator - angular value - It always have .html and .ts
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
/**
 * Controller for html (template)
 */
export class AppComponent implements OnInit {
  /**
   * List of tasks
   * {Task[]} - array with tasks
   */
  taskList: Task[] = [];

  /**
   * it is a shit whose save another shit
   */
  appStorage = window.localStorage;

  /**
   * For save form state
   * Fot getting form data
   */
  taskForm = {
    title: '',
    description: '',
  };

  /**
   * Title for page
   */
  title = 'ToDo';

  /**
   * Columns in the mat table
   */
  displayedColumns: string[] = ['select', 'position', 'name', 'date', 'edit'];

  /**
   * Data for drawing mat table
   * It neeed to change after every change task list!
   * {MatTableDataSource} - it is object instance of MatTableDataSource
   */
  dataSource = new MatTableDataSource<Task>(this.taskList);

  /**
   * It object for saving selected rows in the mat table
   * The object is instance of {SelectionModel}
   */
  selection = new SelectionModel<string>(true, []);

  /**
   * getter for tasklist from local storage
   */
  get dataLocalStorage(): Task[] {
    const data = this.appStorage.getItem('taskList');
    if (data){
      return  JSON.parse(data);
    }
    this.appStorage.setItem('taskList','[]');
    return [];
  }

  /**
   * There is initialization of class
   */
  constructor(public readonly dialog: MatDialog, private readonly snackBar: MatSnackBar) {}

  /**
   * called once after setting the bean properties that are involved in the binding. Performs component initialization
   */
  ngOnInit(): void {
    this.taskList = this.dataLocalStorage;
    this.dataSource.data = this.taskList;
  }

  /**
   * method for writting data to local storage by key
   * @param key {string}
   * @param data {any}
   */
  setDataLocalStorage(key: string, data: any) {
    this.appStorage.setItem(key, JSON.stringify(data));
  }

  /**
   * open modal window
   */
  openDialog(task: Task): void {
    const dialogRef = this.dialog.open(TaskInfoModalComponent, {
      data: task,
      panelClass: 'app-full-bleed-dialog',
    });

    dialogRef.afterClosed().subscribe((result: Task) => {
      if (result) this.deleteTaskById(result.id);
    });
  }

  /**
   * method for edit task
   */
  editTask(task: Task | undefined): void {
    const dialogRef = this.dialog.open(EditModuleComponent, {
      data: task,
      panelClass: 'edit-modal-dialod',
    });

    dialogRef.afterClosed().subscribe((result: Task | undefined) => {
      if (result) {
        const taskList = this.dataLocalStorage;
        taskList.forEach((task) => {
          if (task.id === result.id) {
            task.name = result.name;
            task.description = result.description;
          }
        })
        this.setDataLocalStorage('taskList', taskList);
        this.taskList = this.dataLocalStorage;
        this.dataSource.data = this.taskList;
      }
    });
  }

  sortTasks(key: 'name' | 'date'): void{
    this.taskList = this.taskList.sort((a: Task, b: Task) =>{
      if (a[key] > b[key]) {
        return 1;
      }
      if (a[key] < b[key]) {
        return -1;
      }
      return 0;
    })
    this.dataSource.data = this.taskList;
  }
  /**
   * method for filter tasks
   */
  filterTasks(id: string): void {
    if (id === 'chip-1') {
      this.taskList = this.dataLocalStorage;
      this.dataSource.data = this.taskList;
    } else if (id === 'chip-2') {
      const todayDate = this.formateDate(Date.now());
      this.taskList = [];
      this.taskList = this.filtertasksbyDate(todayDate);
      this.dataSource.data = this.taskList;
    } else if (id === 'chip-3') {
      const yesterdayDate = this.formateDate(Date.now() - 86400000);
      this.taskList = [];
      this.taskList = this.filtertasksbyDate(yesterdayDate);
      this.dataSource.data = this.taskList;
    }
  }

  /**
   * method for filter tasks for date
   */
  filtertasksbyDate(date: string): Task[] {
    return this.dataLocalStorage.filter((task) => {
      return task.date === date;
    });
  }

  /**
   * method for formate date
   */
  formateDate(date: number): string {
    return formatDate(date, 'dd.MM.yyyy', 'en-US');
  }

  /**
   * method for add task
   */
  addTask(): void {
    if(this.taskForm.title && this.taskForm.description) {
      const taskList = this.dataLocalStorage;
      const task: Task = {
        id : uuidv4(),
        name: this.taskForm.title,
        description: this.taskForm.description,
        date: this.formateDate(Date.now()),
      };
      taskList.push(task);
      this.setDataLocalStorage('taskList', taskList);
      this.taskList = this.dataLocalStorage;
      this.dataSource.data = this.taskList;
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

  /**
   * method for deleting task
   */
  deleteTask(): void {
    let taskList = this.dataLocalStorage;
    taskList = taskList?.filter((task: Task) => {
       return !(this.selection.isSelected(task?.id))
    });
    this.setDataLocalStorage('taskList', taskList);
    this.taskList = this.dataLocalStorage;
    this.dataSource.data = this.taskList;
  }

  /**
   * method for delete task by Id
   * @param id {string}
   */
  deleteTaskById(id: string): void {
    let taskList = this.dataLocalStorage;
    taskList = taskList?.filter((task: Task) => {
       return task.id !== id
    });
    this.setDataLocalStorage('taskList', taskList);
    this.taskList = this.dataLocalStorage;
    this.dataSource.data = this.taskList;
  }
  /**
   * Whether the number of selected elements matches the total number of rows
   * @returns {boolean}
   */
  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data.map(data => data?.id));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(id?: string): string {
    if (!id) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(id) ? 'deselect' : 'select'} row ${
      id + 1
    }`;
  }
}
