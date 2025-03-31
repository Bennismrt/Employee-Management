import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from 'src/app/_model/app.model';
import { BankDataEmployeeService } from 'src/app/_service/app.service';
import Swal from 'sweetalert2';

// Validator untuk memastikan password dan confirmPassword cocok
export const matchPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password && confirmPassword && password !== confirmPassword ? { passwordMismatch: true } : null;
};

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    isShowPassword: boolean = false;
    registerForm!: FormGroup;
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
        this.registerForm = this.fb.group({
            username: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/\d/)]],
            confirmationPassword: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/\d/)]]
        }, {
            validator: this.ConfirmedValidator('password', 'confirmationPassword'),
        });
    }

    loadAllEmployees() {
        this.employees = this.employeeService.getEmployees();
    }

    submitForm() {
        if (this.registerForm.valid) {
            const {status, messages} = this.employeeService.verifyRegister(this.registerForm.value);
            if(status){
                this.showAlert('Success!', 'Your register was successful!','success');
            }else{
                this.showAlert('Error!', messages,'error');
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

    ConfirmedValidator(controlName: string, matchingControlName: string) {
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[controlName];
            const matchingControl = formGroup.controls[matchingControlName];

            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({ confirmedValidator: true });
            } else {
                matchingControl.setErrors(null);
            }
        };
    }
}
