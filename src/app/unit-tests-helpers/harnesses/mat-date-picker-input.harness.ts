import { HarnessPredicate, LocatorFactory } from '@angular/cdk/testing';
import { MatDatepickerInputHarness, MatDatepickerToggleHarness } from '@angular/material/datepicker/testing';
import { IdHarnessFilters } from './id-harness.filter';


export class MatDatepickerInputTestingHarness extends MatDatepickerInputHarness {

    static with(options: IdHarnessFilters): HarnessPredicate<MatDatepickerInputHarness> {
        return new HarnessPredicate(MatDatepickerInputHarness, options)
            .addOption('id', options.id,
                (harness, id) => {
                    const buttonId = ((((harness as any).locatorFactory as LocatorFactory).rootElement as any).element as HTMLElement).id;
                    return HarnessPredicate.stringMatches(buttonId, id);
                });
    }
}
