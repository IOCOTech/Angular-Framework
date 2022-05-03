import { AbstractControl, FormGroup } from '@angular/forms'

export type smartFormGroup<T extends string | number | symbol> = FormGroup & {
  controls: Record<T, AbstractControl>
}
