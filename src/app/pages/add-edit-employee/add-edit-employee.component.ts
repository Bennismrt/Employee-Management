import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/_model/app.model';
import { BankDataEmployeeService } from 'src/app/_service/app.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-edit-employee',
  templateUrl: './add-edit-employee.component.html'
})
export class AddEditComponent implements OnInit{
    status: 'add' | 'edit' = 'add';
    detailEmployee = {
        id: '',
        position: '',
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        birthDate: '',
        basicSalary: 0,
        status: '',
        group: '',
        description: '',
    } as unknown as Employee
    employeeId: string = '';

    employeeForm!: FormGroup;
    today: string = new Date().toISOString().split('T')[0];
    
    groupLists = ['HR', 'Software Development', 'Customer Service', 'Technical Support', 'Sales', 'Public Relations', 'Finance', 'UI/UX Design', 'DevOps', 'Network Engineering',]

    constructor(
        private service: BankDataEmployeeService,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private router: Router
    ){}

    ngOnInit(): void {
        this.employeeId = this.route.snapshot.paramMap.get('id')!!;
        if(this.employeeId){
            this.status = 'edit'
            this.detailEmployee = this.service.getDetailEmployees(this.employeeId) as Employee
        }else{
            this.status = 'add';
        }
        this.initForm();
    }

    initForm(){
        this.employeeForm = this.fb.group({
            username: [this.detailEmployee && this.detailEmployee?.username === '' ? '' : this.detailEmployee?.username, [Validators.required]],
            firstName: [this.detailEmployee && this.detailEmployee?.firstName === '' ? '' : this.detailEmployee?.firstName, [Validators.required]],
            lastName: [this.detailEmployee && this.detailEmployee?.lastName === '' ? '' : this.detailEmployee?.lastName, [Validators.required]],
            email: [this.detailEmployee && this.detailEmployee?.email === '' ? '' : this.detailEmployee?.email, [Validators.required, Validators.email]],
            birthDate: [this.detailEmployee && this.detailEmployee?.birthDate.toString() === '' ? '' : new Date(this.detailEmployee!.birthDate), [Validators.required]],
            basicSalary: [this.detailEmployee && this.detailEmployee?.basicSalary === 0 ? 0 : this.formatCurrency(this.detailEmployee?.basicSalary!), [Validators.required, Validators.min(1)]],
            status: [this.detailEmployee && this.detailEmployee?.status === '' ? '' : this.detailEmployee?.status, [Validators.required]],
            group: [this.detailEmployee && this.detailEmployee?.group === '' ? '' : this.detailEmployee?.group, [Validators.required]],
            description: [this.detailEmployee && this.detailEmployee?.description === '' ? '' : this.detailEmployee?.description, [Validators.required]],
        });
    }

    formatCurrency(value: number | null): string {
        return value ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') : '';
    }
    
    updateSalary(event: any) {
        const clearDot = Number(event.target.value.replace(/\./g, ''));
        this.employeeForm.get('basicSalary')!.setValue(clearDot);
    }

    backToHomepage(){
        const allParams = this.route.snapshot.queryParams;
        let param = `?currentPage=${allParams['currentPage'] ? allParams['currentPage'] : '0'}&pageSize=${allParams['pageSize'] ? allParams['pageSize'] : '10'}${allParams['search1'] ? '&search1=' + allParams['search1'] : ''}${allParams['search2'] ? '&search2=' + allParams['search2'] : ''}${allParams['sort'] ? '&sort=' + allParams['sort'] : ''}`;
        this.router.navigateByUrl('/' + param)
    }
    submitForm(){
        if(this.status === 'add'){
            this.service.addEmployee({...this.employeeForm.value, id:crypto.randomUUID(), position: this.service.getEmployees()[this.service.getEmployees().length - 1].position + 1 });
            this.showAlert('Success Add Employee', 'Employee details have been successfully added!', 'success');
            this.backToHomepage();
        }else{
            this.service.updateEmployee({...this.employeeForm.value, id: this.detailEmployee.id, position: this.detailEmployee.position});
            this.showAlert('Success Edit Employee', 'Employee details have been successfully updated!', 'success');
            this.backToHomepage();
        }
    }

    showAlert(title: string, text: string, icon:string) {
        Swal.fire({
            title: title,
            text: text,
            icon: icon as any,
            confirmButtonText: 'OK'
        });
    }
}
