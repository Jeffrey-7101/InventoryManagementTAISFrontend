import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes'; // Asegúrate de tener el archivo de rutas correctamente importado
import { provideHttpClient, withFetch } from '@angular/common/http';
import { config } from './app/app.config.server';

const bootstrap = () => {
  return bootstrapApplication(AppComponent, {
    providers: [
      provideRouter(routes),    // Provisión de rutas
      provideHttpClient(withFetch()) // Agrega soporte para `fetch` en SSR
    ]
  });
};

export default bootstrap;

