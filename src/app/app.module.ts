import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FormsModule } from '@angular/forms';
import { TaskInfoModalComponent } from './component/task-info-modal/task-info-modal.component';
import { EditModuleComponent } from './edit-module/edit-module.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskInfoModalComponent,
    EditModuleComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
