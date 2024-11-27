// main.ts

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withFetch } from '@angular/common/http';  // Importar HttpClient y configuración de fetch
import { provideRouter } from '@angular/router';  // Importar provideRouter para las rutas
import { routes } from './app/app.routes';  // Importar tus rutas definidas
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';  // Importar animaciones si las necesitas

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withFetch()), // Habilitar fetch para mejorar el rendimiento en SSR
    provideRouter(routes), // Configurar rutas con el archivo de rutas
    provideAnimations(), provideAnimationsAsync(), // Si estás utilizando animaciones
    // Aquí podrías agregar otros proveedores necesarios para tu aplicación
  ]
})
  .catch((err) => console.error(err));
