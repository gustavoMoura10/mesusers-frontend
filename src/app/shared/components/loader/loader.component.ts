import { Component } from '@angular/core';

@Component({
  selector: 'app-loader',
  template: `
    <div class="flex justify-center items-center">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    </div>
  `,
})
export class LoaderComponent {}