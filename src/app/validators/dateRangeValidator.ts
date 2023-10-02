import { FormControl, ValidatorFn } from '@angular/forms';

export function dateRangeValidator(): ValidatorFn {
  return (control: FormControl) => {
    if (!control || !control.parent) {
      return null;
    }

    const startDate = control.parent.get('dataInicio')?.value;
    const endDate = control.value;

    if (startDate && endDate) {
      const diffInMs =
        new Date(endDate).getTime() - new Date(startDate).getTime();
      const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

      if (diffInDays > 30) {
        return { dateValid: true };
      }
    }

    return null;
  };
}
