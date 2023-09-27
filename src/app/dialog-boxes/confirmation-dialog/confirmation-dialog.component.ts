import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModelDialogDataConfirmation } from 'src/app/models/dialog-data/dialog-data.model';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {

  header: string;
  message: string;
  displayCancelButton: boolean;
  icon: string;
  iconColor: string;
  okButtonText: string

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModelDialogDataConfirmation
  ) {
    this.header = data?.header ?? 'Confirmation';
    this.message = data?.message ?? 'Confirmation not initialized with data';
    this.displayCancelButton = data?.displayCancelButton ?? true;
    this.icon = data?.icon ?? 'info'
    this.okButtonText = data?.okButtonText ?? 'Ok';
    this.iconColor = data?.iconColor ?? "#0d0d0d"
  }
}
