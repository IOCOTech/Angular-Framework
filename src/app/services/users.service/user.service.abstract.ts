import { Observable } from 'rxjs';
import { ModelUser } from '../../models/users/user-details.model';

export abstract class AbstractServiceUser {

    abstract getUserDetails(username: string, password: string): Observable<ModelUser>;

}
