import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

const MaterialComponents = [
  MatButtonModule,
  MatCheckboxModule,
  CommonModule,
  MatInputModule,
  MatIconModule,
];

@NgModule({
  declarations: [],
  imports: [...MaterialComponents],
  exports: [...MaterialComponents]
})
export class MaterialModule { }
