import { Component } from '@angular/core';
import { IngresoFormComponent } from "../ingreso-form/ingreso-form.component";

@Component({
  selector: 'app-header-ingresos',
  standalone: true,
  imports: [IngresoFormComponent],
  templateUrl: './header-ingresos.component.html',
  styleUrl: './header-ingresos.component.css'
})
export class HeaderIngresosComponent {

}
