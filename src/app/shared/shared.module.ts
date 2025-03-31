import { NgModule } from "@angular/core";
import { ConfirmationDialogComponent } from "./confirmation-dialog/confirmation-dialog.component";
import { MatDialogModule } from "@angular/material/dialog";
import { EmployeeFormDialogComponent } from "./employee-form-dialog/employee-form-dialog.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from "@angular/common";
import { PipeModule } from "../_pipe/pipe.module";
import { NumberDirective } from "../_directives/number-only.directive";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { HeadersComponent } from "./headers/headers.component";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [
    ConfirmationDialogComponent, 
    EmployeeFormDialogComponent,
    HeadersComponent,
    NumberDirective
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatSelectModule,
    MatOptionModule,  
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    PipeModule,
    RouterModule
  ],
  exports: [
    ConfirmationDialogComponent, 
    EmployeeFormDialogComponent,
    HeadersComponent,
    PipeModule,
    NumberDirective
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    NumberDirective
  ]
})
export class SharedModule { }
