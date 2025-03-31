import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { confirmationDialog } from 'src/app/_model/app.model';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
})
export class ConfirmationDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: confirmationDialog,
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>
  ) {}

  ngOnInit(): void {}

  confirmDialog(value: string){
    if(value === 'confirm'){
      this.dialogRef.close('confirm');
    }else{
      this.closeDialog();
    }
  }

  closeDialog(){
    this.dialogRef.close();
  }
}
