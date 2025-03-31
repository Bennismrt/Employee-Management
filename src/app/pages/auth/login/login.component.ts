import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from 'src/app/_model/app.model';
import { BankDataEmployeeService } from 'src/app/_service/app.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    isShowPassword: boolean = false;
    loginForm!: FormGroup;
    messageGreeting: string = '';
    employees: Employee[] = [];
    constructor (
        private fb : FormBuilder,
        private employeeService: BankDataEmployeeService,
        private router: Router
    ) {

    }

    ngOnInit(): void {
        this.initForm();
        this.messageGreeting = this.employeeService.getGreeting();
    }

    initForm(){
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/\d/)]]
        })
    }

    loadAllEmployees() {
        this.employees = this.employeeService.getEmployees();
    }

    submitForm() {
        if (this.loginForm.valid) {
            const isLogin = this.employeeService.verifyLogin(this.loginForm.value);
            if(isLogin){
                this.showAlert('Success!', 'Your action was successful!','success');
            }else{
                this.showAlert('Error!', 'Invalid email or password. Please try again.','error');
            };
            
        }
    }

    showAlert(title: string, text: string, icon:string) {
        Swal.fire({
          title: title,
          text: text,
          icon: icon as any,
          confirmButtonText: 'OK'
        }).then((result) => {
            if(icon === 'success'){
                this.router.navigateByUrl('/');
            }else{
                sessionStorage.clear()
            }
        });
    }
}
