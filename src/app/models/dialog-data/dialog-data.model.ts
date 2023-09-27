import { MaterialIcons } from 'src/app/enums/separated-enums/material-icons.enum';

export interface ModelDialogDataConfirmation {
    header: string;
    message: string;
    displayCancelButton?: boolean,
    okButtonText?: string;
    icon?: MaterialIcons
    iconColor?: string
}
