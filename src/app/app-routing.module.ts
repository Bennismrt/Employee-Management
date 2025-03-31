import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_guard/app.guard';
import { CommonModule } from '@angular/common';
import { DetailEmployeeComponent } from './pages/detail-employee/detail-employee.component';
import { SharedModule } from './shared/shared.module';
import { AddEditComponent } from './pages/add-edit-employee/add-edit-employee.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: 'auth',
    canActivateChild: [AuthGuard],
    loadChildren: () => import('../app/pages/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    loadChildren: () => import('../app/pages/homepage/homepage.module').then((m) => m.HomepageModule),
  },
  {path: 'detail/:id', component: DetailEmployeeComponent, canActivate: [AuthGuard]},
  {path: 'add-employee', component: AddEditComponent, canActivate: [AuthGuard]},
  {path: 'edit-employee/:id', component: AddEditComponent, canActivate: [AuthGuard]},

  { path: '**', redirectTo: '/' },
];

@NgModule({
  declarations: [DetailEmployeeComponent,AddEditComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatFormFieldModule, 
    MatInputModule,
    MatSelectModule,
    MatOptionModule,  
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
