import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  defaultLang = "en-US";

  constructor(
    private translateService : TranslateService,
    @Inject(PLATFORM_ID) private platformId: object
  ) { 

      if(isPlatformBrowser(platformId)) {
        const savedLang = localStorage.getItem('lng');
        if (savedLang) {
          this.defaultLang = savedLang;
        }
        translateService.setDefaultLang(this.defaultLang);
        translateService.use(this.defaultLang);
      }
  }

  changeLang(lang: string) {
    this.translateService.use(lang);
    if(isPlatformBrowser(this.platformId)) {
      localStorage.setItem('lng', lang);
    }
  }

}
