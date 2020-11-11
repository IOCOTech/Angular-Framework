import { AbstractServiceUser } from 'src/app/services/users.service/user.service.abstract';
import { Observable } from 'rxjs';
import { ModelUser } from 'src/app/models/users/user-details.model';
import { AbstractEndpoints } from 'src/environments/endpoints/endpoints.abstract';
import { HttpClient } from '@angular/common/http';

export class MockServiceUser implements AbstractServiceUser {

    constructor(endpoints: AbstractEndpoints, private http: HttpClient) {

    }

    getUserDetails(username: string, password: string): Observable<ModelUser> {
        throw new Error('Method not implemented.');
    }
}
