import { Router } from '@angular/router';
import { ServiceConfig } from './config.service';


export function FactoryServiceConfig(serviceConfig: ServiceConfig, router: Router): () => Promise<unknown> {
    console.log('Config Service Factory loaded');
    // Promise wrapped in promise to make provision for async calls in setup after loadConfig
    const promise = new Promise((res, rej) => {
        serviceConfig.loadConfig()
            .then(() => {
                // Add any logic that should load after loading config before starting the application
                res(true);
            });
    });
    // For the app initializer the factory needs tot return a function that returns a promise
    return () => promise;
}
