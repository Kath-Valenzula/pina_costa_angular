import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './registro.component';

const routes: Routes = [
  { path: '', component: RegistroComponent }
];

@NgModule({
  declarations: [RegistroComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule.forChild(routes)]
})
export class RegistroModule {}
