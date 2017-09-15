import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';



@Pipe({name: 'sanitizationPipe', pure: true})
export class SanitizationPipe implements PipeTransform {
  constructor(private sanitizer?:DomSanitizer) {}
  transform(value: string, args ) {
  	if (args[0].key === 'safeHTML') {
    	return this.sanitizer.bypassSecurityTrustHtml(value);
   	} else {
   	 	return value;
   	}
  }
}

