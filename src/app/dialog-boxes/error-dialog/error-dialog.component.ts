import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModelErrorDialogConfig } from 'src/app/models/dialog-data/error-dialog-config.model';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss']
})
export class ErrorDialogComponent implements OnInit {

  displayReportIssueButton = false;
  errorMessage = '';
  header = '';
  icon = '';

  constructor(
    public dialogRef: MatDialogRef<ErrorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModelErrorDialogConfig
  ) {
    this.displayReportIssueButton = data.displayReportIssueButton;
    this.errorMessage = data.errorMessage;
    this.header = data.header;
    this.icon = data.icon;
  }

  ngOnInit(): void {
    this.dialogRef.disableClose = true;
  }
}
