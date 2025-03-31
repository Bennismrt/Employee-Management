import {Component, Inject, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Employee } from 'src/app/_model/app.model';

@Component({
  selector: 'app-employee-form-dialog',
  templateUrl: './employee-form-dialog.component.html',
  styleUrls: ['employee-form-dialog.component.scss']
})
export class EmployeeFormDialogComponent implements OnInit {
    employeeForm!: FormGroup;
    today: string = new Date().toISOString().split('T')[0];

    groupLists = ['HR', 'Software Development', 'Customer Service', 'Technical Support', 'Sales', 'Public Relations', 'Finance', 'UI/UX Design', 'DevOps', 'Network Engineering',]

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: Employee,
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<EmployeeFormDialogComponent>
    ) {}

    ngOnInit(): void {
        this.initForm();
        
    }

    initForm(){
        this.employeeForm = this.fb.group({
            username: [this.data && this.data.username === '' ? '' : this.data.username, [Validators.required]],
            firstName: [this.data && this.data.firstName === '' ? '' : this.data.firstName, [Validators.required]],
            lastName: [this.data && this.data.lastName === '' ? '' : this.data.lastName, [Validators.required]],
            email: [this.data && this.data.email === '' ? '' : this.data.email, [Validators.required, Validators.email]],
            birthDate: [this.data && this.data.birthDate.toString() === '' ? '' : new Date(this.data.birthDate), [Validators.required]],
            basicSalary: [this.data && this.data.basicSalary === 0 ? 0 : this.formatCurrency(this.data.basicSalary), [Validators.required, Validators.min(1)]],
            status: [this.data && this.data.status === '' ? '' : this.data.status, [Validators.required]],
            group: [this.data && this.data.group === '' ? '' : this.data.group, [Validators.required]],
            description: [this.data && this.data.description === '' ? '' : this.data.description, [Validators.required]],
        });
    }


    formatCurrency(value: number | null): string {
        return value ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') : '';
    }
    
    updateSalary(event: any) {
        const clearDot = Number(event.target.value.replace(/\./g, ''));
        this.employeeForm.get('basicSalary')!.setValue(clearDot);
    }

    closeDialog(){
        this.dialogRef.close();
    } 

    submitForm(){
        this.dialogRef.close(this.employeeForm.value);
    }
}
