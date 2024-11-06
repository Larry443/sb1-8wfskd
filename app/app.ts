import { Application } from '@nativescript/core';
import { registerElement } from '@nativescript/core';
import { localize, loadLocaleJSON } from '@nativescript/localize';

// Load translations
loadLocaleJSON({
    'en': require('./i18n/en.json'),
    'es': require('./i18n/es.json')
});

Application.run({ moduleName: 'views/login-page' });