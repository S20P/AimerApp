import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import 'hammerjs';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));


//Handel Console for app


console.log('environment', environment.production);
//window.console.log = function(){};

// if (env === 'prod') {
//   window.console.log = function () { };
// }
if (environment.production==true) {
  window.console.log = function(){};
 }

//  CMD is ===>> ng serve -environment dev
  //or 
// ng serve -env dev  

//ng s --environment=prod

