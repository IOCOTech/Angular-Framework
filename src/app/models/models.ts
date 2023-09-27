import { ModelErrorDialogConfig } from './dialog-data/error-dialog-config.model';
import { ModelInitializer } from './model-initializer.helper.ts.template';
import { ModelSnackBarDetails } from './snack-bar/snack-bar-details.model';
import { ModelUser } from './user/user-details.model';


export type ErrorDialogConfig = ModelErrorDialogConfig;
export const Initialize = ModelInitializer
export type SnackbarDetails = ModelSnackBarDetails;
export type User = ModelUser;