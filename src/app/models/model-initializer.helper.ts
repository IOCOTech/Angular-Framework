import { Enums } from '../enums/enums';
import { MaterialIcons } from '../enums/separated-enums/material-icons.enum';
import { ModelErrorDialogConfig } from './dialog-data/error-dialog-config.model';
import { ModelUser } from './users/user-details.model';

export class ModelInitializer {

    static ErrorDialog = class {
        static ErrorDialogConfig = (
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

    static User = (data?: Partial<ModelUser>): ModelUser => {
        return {
            id: !!data ? (data?.id ?? '') : ''
            , name: !!data ? (data?.name ?? '') : '',
            surname: !!data ? (data?.surname ?? '') : '',
            cellNumber: !!data ? (data?.cellNumber ?? '') : '',
            email: !!data ? (data?.email ?? '') : ''
        };
    }
}
