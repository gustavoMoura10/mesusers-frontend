import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mask'
})
export class MaskPipe implements PipeTransform {

  transform(value: string, mask: string): string {
    if (!value) return value;

    let maskedValue = '';
    let maskIndex = 0;

    for (let i = 0; i < value.length; i++) {
      if (maskIndex >= mask.length) break;

      const char = value.charAt(i);
      const maskChar = mask.charAt(maskIndex);

      if (maskChar === '0') {
        maskedValue += char;
        maskIndex++;
      } else {
        maskedValue += maskChar;
        maskIndex++;
        i--;
      }
    }
    return maskedValue;
  }
}
