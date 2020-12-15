import { of } from 'rxjs';
import * as MockData from '../mock-data/db.json';

export class UnitTestHelpers {

    static MockObjects = class {
        static abstractServiceUser = jasmine.createSpyObj('AbstractServiceUser', {
            getAllUsers: of(MockData.users),
        });
    };
}
