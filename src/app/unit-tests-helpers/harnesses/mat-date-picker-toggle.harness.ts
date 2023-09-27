import { HarnessPredicate, LocatorFactory } from '@angular/cdk/testing';
import { MatDatepickerToggleHarness } from '@angular/material/datepicker/testing';
import { IdHarnessFilters } from './id-harness.filter.ts.template';


export class MatDatepickerToggleTestingHarness extends MatDatepickerToggleHarness {

    static with(options: IdHarnessFilters): HarnessPredicate<MatDatepickerToggleHarness> {
        return new HarnessPredicate(MatDatepickerToggleHarness, options)
            .addOption('id', options.id,
                (harness, id) => {
                    const buttonId = ((((harness as any).locatorFactory as LocatorFactory).rootElement as any).element as HTMLElement).id;
                    return HarnessPredicate.stringMatches(buttonId, id);
                });
    }
}
