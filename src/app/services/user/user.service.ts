import { AbstractServiceUser } from './user.service.abstract';
import { Observable } from 'rxjs';
import { ModelUser } from '../../models/user/user-details.model';
import { HttpClient } from '@angular/common/http';
import { AbstractEndpoints } from 'src/environments/endpoints/endpoints.abstract';

export class ServiceUser implements AbstractServiceUser {

    constructor(private endpoints: AbstractEndpoints, private http: HttpClient) { }

    getUserDetails(username: string, password: string): Observable<ModelUser> {
        throw new Error('Method not implemented.');
    }

}
