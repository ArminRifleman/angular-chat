import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emailShortener',
  standalone: false
})
export class EmailShortenerPipe implements PipeTransform {
  transform(email: string | null): string {
    if (!email) return '';
    return email.split('@')[0];
  }
}