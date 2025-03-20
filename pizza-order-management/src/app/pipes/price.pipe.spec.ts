import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price'
})
export class PricePipe implements PipeTransform {
  transform(value: number | string, currencySymbol: string = '$'): string {
    // Convert string input to number
    if (typeof value === 'string') {
      value = parseFloat(value);
    }

    // Check if the value is a valid number
    if (isNaN(value)) {
      return 'Invalid price';
    }

    // Format the number as currency with 2 decimal places
    return `${currencySymbol}${value.toFixed(2)}`;
  }
}