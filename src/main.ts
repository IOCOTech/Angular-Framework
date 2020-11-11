import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { Enums } from './app/enums/enums';
import { AppSettings } from './environments/app-settings/app-settings';

if (AppSettings.environment === Enums.Environments.Production) {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
