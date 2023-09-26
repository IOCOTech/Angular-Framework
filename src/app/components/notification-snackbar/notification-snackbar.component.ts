import { Component } from '@angular/core';
import { ServiceSnackBar } from 'src/app/services/snack-bar/snack-bar.service';

@Component({
  selector: 'app-notification-snackbar',
  templateUrl: './notification-snackbar.component.html',
  styleUrls: ['./notification-snackbar.component.scss']
})
export class NotificationSnackbarComponent {

  constructor(private serviceSnackbar: ServiceSnackBar) { }

  respond(response: boolean) {
    this.serviceSnackbar.dismissSnackBar(response);
  }
}
