import { Component, OnInit } from '@angular/core';
import { ServiceMonitoring } from 'src/app/services/monitor.service/monitor.service';

@Component({
    selector: 'app-oid-redirect',
    templateUrl: './oid-redirect.component.html',
    styleUrls: ['./oid-redirect.component.scss']
})
export class OidRedirectComponent implements OnInit {

    constructor(private serviceMonitoring: ServiceMonitoring) { }

    ngOnInit(): void {
        this.serviceMonitoring.logEvent(this, 'OIDRedirect component loaded');
    }

}
