import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Para [(ngModel)]
import { RouterModule } from '@angular/router';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ProductTableComponent } from './product-table/product-table.component';
import { HeaderComponent } from './header/header.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { DeleteConfirmationComponent } from './delete-confirmation/delete-confirmation.component';
import { IngresosComponent } from './ingresos/ingresos.component';
import { SalidasComponent } from './salidas/salidas.component';
import { routes } from './app.routes'; // Archivo de rutas

// Angular Material
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select'; // Nuevo
import { MatOptionModule } from '@angular/material/core';  // Nuevo
import { MatIconModule } from '@angular/material/icon';    // Nuevo
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    // Declaraciones solo para componentes que NO sean standalone
    AppComponent,
    ProductTableComponent,
    HeaderComponent,
    ProductFormComponent,
    DeleteConfirmationComponent,
    IngresosComponent,
    SalidasComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatNativeDateModule,
    BrowserAnimationsModule, // Necesario para Material
    MatSelectModule,
    MatOptionModule,
    MatIconModule,
  ],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent], // Componente raíz
})

export class AppModule {}
