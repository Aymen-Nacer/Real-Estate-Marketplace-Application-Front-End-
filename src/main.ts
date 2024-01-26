import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));

document.addEventListener('contextmenu', (event) => event.preventDefault());

document.addEventListener('keydown', (event) => {
  if (
    event.keyCode === 123 ||
    (event.ctrlKey && event.shiftKey && event.keyCode === 73)
  ) {
    event.preventDefault();
  }
});
