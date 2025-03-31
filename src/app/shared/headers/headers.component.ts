import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BankDataEmployeeService } from 'src/app/_service/app.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
})
export class HeadersComponent implements OnInit{
  messageGreeting : string = '';

  constructor(
    private service: BankDataEmployeeService, 
    private dialog: MatDialog,
    private router: Router
  ){}

  ngOnInit(): void {
    this.messageGreeting = this.service.getGreeting();
  }

  onLogout(){
    this.dialog.open(ConfirmationDialogComponent, {
        data: {
            title: "Logout Confirmation ⚠️",
            sub_title: "Are you sure you want to log out?",
            cancel: "Cancel",
            confirm: "Confirm",
            image: 'assets/gif/confirmation.gif'
        }
    }).afterClosed().subscribe((res) => {
        if(res){
            sessionStorage.clear();
            this.router.navigateByUrl('/auth/login');
            this.showAlert('Success Logout Account', 'Successfully logged out. See you next time!👋', 'success');
        }
    })
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
