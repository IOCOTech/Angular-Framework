import { HarnessPredicate, LocatorFactory } from '@angular/cdk/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { IdHarnessFilters } from './id-harness.filter.ts.template';


export class MatButtonTestingHarness extends MatButtonHarness {

    static with(options: IdHarnessFilters): HarnessPredicate<MatButtonHarness> {
        return new HarnessPredicate(MatButtonHarness, options)
            .addOption('id', options.id,
                (harness, id) => {
                    const buttonId = ((((harness as any).locatorFactory as LocatorFactory).rootElement as any).element as HTMLElement).id;
                    return HarnessPredicate.stringMatches(buttonId, id);
                });
    }
}
