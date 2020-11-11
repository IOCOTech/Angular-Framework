import { ModelUser } from './users/user-details.model';
import { ModelErrorDialogConfig } from './dialog-data/error-dialog-config.model';
import { Helpers } from '../helpers/helpers';
import { Enums } from '../enums/enums';
import { MaterialIcons } from '../enums/separated-enums/material-icons.enum';

export class Models {

    static ErrorDialog = class {
        static ErrorDialogConfig = class {
            static Initialize = (
                errorMessage: string, header: string = 'Error',
                icon: MaterialIcons = Enums.MaterialIcons.Error,
                displayReportIssueButton: boolean = false): ModelErrorDialogConfig => {
                return {
                    errorMessage
                    , header
                    , icon
                    , displayReportIssueButton
                };
            }
        };
    };

    static User = class {

        static Initialize = (data?: Partial<ModelUser>): ModelUser => {
            return {
                id: !!data ? (data?.id ?? '') : ''
                , name: !!data ? (data?.name ?? '') : '',
                surname: !!data ? (data?.surname ?? '') : '',
                cellNumber: !!data ? (data?.cellNumber ?? '') : '',
                email: !!data ? (data?.email ?? '') : ''
            };
        }
    };
}
