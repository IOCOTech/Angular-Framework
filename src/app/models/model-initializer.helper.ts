import { Enums } from '../enums/enums';
import { MaterialIcons } from '../enums/separated-enums/material-icons.enum';
import * as Models from 'src/app/models/models';

export class ModelInitializer {

    static ErrorDialog = class {
        static ErrorDialogConfig = (
            errorMessage: string, header: string = 'Error',
            icon: MaterialIcons = Enums.MaterialIcons.Error,
            displayReportIssueButton: boolean = false): Models.ErrorDialogConfig => {
            return {
                errorMessage
                , header
                , icon
                , displayReportIssueButton
            };
        }
    };

    static User = (data?: Partial<Models.User>): Models.User => {
        return {
            id: !!data ? (data?.id ?? '') : ''
            , name: !!data ? (data?.name ?? '') : '',
            surname: !!data ? (data?.surname ?? '') : '',
            cellNumber: !!data ? (data?.cellNumber ?? '') : '',
            email: !!data ? (data?.email ?? '') : ''
        };
    }
}
