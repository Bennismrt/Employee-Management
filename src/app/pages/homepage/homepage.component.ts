import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/_model/app.model';
import { BankDataEmployeeService } from 'src/app/_service/app.service';
import { PageEvent } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { EmployeeFormDialogComponent } from 'src/app/shared/employee-form-dialog/employee-form-dialog.component';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit{
    listEmployees : Employee[] = [];
    pageSize: number = 10;
    currentPage: number = 0;
    totalPage: number = 0;
    

    // input = new FormControl('');
    messageGreeting: string = '';

    sortType: string = '';

    employeeName: string = '';
    employeeStatus: string = '';
    constructor(
        private service : BankDataEmployeeService, 
        private dialog: MatDialog,
        private router: Router,
        private route: ActivatedRoute
    ){}

    ngOnInit(): void {
        const allParams = this.route.snapshot.queryParams;
        if(Object.entries(allParams).length > 0){
            this.currentPage = Number(allParams['currentPage']);
            this.pageSize = Number(allParams['pageSize']);

            if(allParams['sort']){
                this.employeeName = allParams['search1'] ? allParams['search1'] : '';
                this.employeeStatus = allParams['search2'] ? allParams['search2'] : '';
                this.sortType = allParams['sort'];
                this.onPageChangeByValue('sort', allParams['sort']);
            }else{
                this.employeeName = allParams['search1'] ? allParams['search1'] : '';
                this.employeeStatus = allParams['search2'] ? allParams['search2'] : '';
                this.onPageChangeByValue(this.employeeName !== '' || this.employeeStatus !== '' ? 'search' : '');
            }
        }else{
            this.listEmployees = [...this.service.getEmployees().slice(0,this.pageSize)];
            this.totalPage = this.service.getEmployees().length;
        }
    }

    // ---------- SEARCHING SECTION --------------------------
    openSearch(){
        this.pageSize = 10;
        this.currentPage = 0;
        const startIndex = Number(this.currentPage) * Number(this.pageSize);
        const endIndex = startIndex + Number(this.pageSize);

        let data = this.service.getEmployees().filter((emp) => {
            return (this.employeeName ? (emp.firstName + ' ' + emp.lastName).toLowerCase().includes(this.employeeName.toLowerCase()) : true)&&
            (this.employeeStatus ? (emp.status).toLowerCase().includes(this.employeeStatus.toLowerCase()) : true)
        });

        this.listEmployees = data.slice(startIndex,endIndex);
        this.totalPage = data.length;

        this.sortType = '';
        
        return this.listEmployees;
    }
    
    executeSearch(){
        const startIndex = Number(this.currentPage) * Number(this.pageSize);
        const endIndex = startIndex + Number(this.pageSize);
        let data = this.service.getEmployees().filter((emp) => {
            return (this.employeeName ? (emp.firstName + ' ' + emp.lastName).toLowerCase().includes(this.employeeName.toLowerCase()) : true)&&
            (this.employeeStatus ? (emp.status).toLowerCase().includes(this.employeeStatus.toLowerCase()) : true)
        });
        this.listEmployees = data.slice(startIndex,endIndex);
        this.totalPage = data.length;
        
        return this.listEmployees;
    }


    // ---------- SORTING SECTION --------------------------
    sortData(sortString: string, isInitParams? : boolean){
        const startIndex = Number(this.currentPage) * Number(this.pageSize);
        const endIndex = startIndex + Number(this.pageSize);

        if(!isInitParams){
            this.sortType = this.sortType === sortString ? sortString + ' desc' : sortString;
        }

        const splitSortType = isInitParams ? sortString!.split(' ') : this.sortType.split(' ');
        const valueSort = splitSortType[0] as keyof Employee;
        const typeSort = splitSortType[1];
        

        if(this.employeeName !== '' || this.employeeStatus !== ''){
            const data =  this.service.getEmployees().filter((emp) => {
                return (this.employeeName ? (emp.firstName + ' ' + emp.lastName).toLowerCase().includes(this.employeeName.toLowerCase()) : true)&&
                (this.employeeStatus ? (emp.status).toLowerCase().includes(this.employeeStatus.toLowerCase()) : true)
                }).sort((a,b): any => {
                const valA = a[valueSort] as string | number;
                const valB = b[valueSort] as string | number;
    
                if (typeof valA === 'string' && typeof valB === 'string') {
                    return this.sortType && typeSort === 'desc' ? valB.localeCompare(valA) : valA.localeCompare(valB);
                } else if (typeof valA === 'number' && typeof valB === 'number') {
                    return this.sortType && typeSort === 'desc' ? valB - valA : valA - valB;
                }
            })
            this.listEmployees = data.slice(startIndex, endIndex);
        }else{
            this.listEmployees = this.service.getEmployees().sort((a,b): any => {
                const valA = a[valueSort] as string | number;
                const valB = b[valueSort] as string | number;
        
                if (typeof valA === 'string' && typeof valB === 'string') {
                    return this.sortType && typeSort === 'desc' ? valB.localeCompare(valA) : valA.localeCompare(valB);
                } else if (typeof valA === 'number' && typeof valB === 'number') {
                    return this.sortType && typeSort === 'desc' ? valB - valA : valA - valB;
                }
            }).slice(startIndex,endIndex);
            this.totalPage = this.service.getEmployees().length;
        }


    }

    // ---------- PAGINATION SECTION --------------------------
    
    onPageChangeByValue(action?:string, value?: string){
        const startIndex = Number(this.currentPage) * Number(this.pageSize);
        const endIndex = startIndex + Number(this.pageSize);
        if(action && action === 'search'){
            this.listEmployees = this.executeSearch();
        }else if(action && action === 'sort'){
            this.sortData(value as keyof Employee, true);
        }else{
            this.listEmployees = this.employeeName !== '' || this.employeeStatus !== '' ? this.executeSearch() : this.service.getEmployees( ).slice(startIndex,endIndex);
            this.totalPage = this.service.getEmployees().length;
        }
    }

    onPageChange(event: PageEvent) {
        this.currentPage = event.pageIndex;
        this.pageSize = event.pageSize;

        const startIndex = Number(this.currentPage) * Number(this.pageSize);
        const endIndex = startIndex + Number(this.pageSize);

        if(this.sortType !== ''){
            this.sortData(this.sortType as keyof Employee, true)
        }else{
            if(this.employeeName !== '' || this.employeeStatus !== ''){
                this.executeSearch();
            }else{
                this.listEmployees = this.service.getEmployees().slice(startIndex,endIndex);
            }
        }
    }


    // ---------- DIALOG SECTION --------------------------

    onOpenDialogDeleteEmployee(employee: Employee){
        this.dialog.open(ConfirmationDialogComponent, {
            data: {
                title: "Delete Employee ⚠️",
                sub_title: "Deleting this employee will permanently remove their data. Are you sure you want to proceed?",
                cancel: "Cancel",
                confirm: "It's Okay",
                image: 'assets/gif/delete-file.gif'
            }
        }).afterClosed().subscribe((res) => {
            if(res){
                this.service.deleteEmployee(employee);
                this.onPageChangeByValue();
                this.showAlert('Success Delete Employee', 'Employee details have been successfully deleted!', 'success');
            }
        })
    }

    onOpenDialogAddEmployee(){
        let  param = `?currentPage=${this.currentPage}&pageSize=${this.pageSize}`;
        if(this.employeeName !== ''){
            param = param + '&search1=' + this.employeeName
        }

        if(this.employeeStatus !== ''){
            param = param + '&search2=' + this.employeeStatus
        }

        if(this.sortType !== ''){
            param = param + '&sort=' + this.sortType
        }

        this.router.navigateByUrl('add-employee' + param);

        // this.dialog.open(EmployeeFormDialogComponent, {
        //     data: { username: '', firstName: '', lastName: '', email: '', birthDate: '', basicSalary: 0, status: '', group: '', description: ''}
        // }).afterClosed().subscribe((res) => {
        //     if(res){
        //         this.service.addEmployee({...res, id:crypto.randomUUID(), position: this.service.getEmployees()[this.service.getEmployees().length - 1].position + 1 });
        //         this.totalPage = this.service.getEmployees().length;
        //         this.showAlert('Success Add Employee', 'Employee details have been successfully added!', 'success');
        //     }
        // })
    }

    onEditEmployee(employee: Employee){
        let  param = `?currentPage=${this.currentPage}&pageSize=${this.pageSize}`;
        if(this.employeeName !== ''){
            param = param + '&search1=' + this.employeeName
        }

        if(this.employeeStatus !== ''){
            param = param + '&search2=' + this.employeeStatus
        }

        if(this.sortType !== ''){
            param = param + '&sort=' + this.sortType
        }

        this.router.navigateByUrl('edit-employee/' + employee.id + param);
        // this.dialog.open(EmployeeFormDialogComponent, {
        //     data:employee
        // }).afterClosed().subscribe((res) => {
        //     if(res){
        //         this.service.updateEmployee({...res, id: employee.id, position: employee.position});
        //         this.onPageChangeByValue();
        //         this.showAlert('Success Edit Employee', 'Employee details have been successfully updated!', 'success');
        //     }
        // })
    }

    // ---------- ADDITIONAL SECTION --------------------------

    goToDetailPage(employee: Employee){
        let  param = `?currentPage=${this.currentPage}&pageSize=${this.pageSize}`;
        if(this.employeeName !== ''){
            param = param + '&search1=' + this.employeeName
        }

        if(this.employeeStatus !== ''){
            param = param + '&search2=' + this.employeeStatus
        }

        if(this.sortType !== ''){
            param = param + '&sort=' + this.sortType
        }

        this.router.navigateByUrl('detail/' + employee.id + param);
    }

    trackByIndex(index: number, item: any): number {
        return index; 
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
