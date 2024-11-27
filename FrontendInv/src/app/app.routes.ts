
import { Routes } from '@angular/router';
import { ProductTableComponent } from './product-table/product-table.component';
import { IngresosComponent } from './ingresos/ingresos.component';
import { SalidasComponent } from './salidas/salidas.component';

export const routes: Routes = [
    { path: 'productos', component: ProductTableComponent },
    { path: 'ingresos', component: IngresosComponent },
    { path: 'salidas', component: SalidasComponent },
    { path: '', redirectTo: '/productos', pathMatch: 'full' },
];
