// The usual bootstrapping imports
import { bootstrap }      from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';

import { AppComponent }         from './app.component/app.component';
import { appRouterProviders }   from './app.routes/app.routes';

bootstrap(AppComponent, [
	appRouterProviders,
	HTTP_PROVIDERS
]);
