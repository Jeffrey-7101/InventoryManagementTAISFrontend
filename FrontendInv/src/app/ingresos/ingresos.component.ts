import { Component } from '@angular/core';
import { HeaderIngresosComponent } from "../header-ingresos/header-ingresos.component";
import { DeleteConfirmationComponent } from "../delete-confirmation/delete-confirmation.component";

@Component({
  selector: 'app-ingresos',
  standalone: true,
  imports: [HeaderIngresosComponent, DeleteConfirmationComponent],
  templateUrl: './ingresos.component.html',
  styleUrl: './ingresos.component.css'
})
export class IngresosComponent {
  ingresos = [
    {
      codigo: 'Nota001',
      cantidadTotal: 20,
      precioTotal: 20.0,
      fecha: '01/01/2024',
    },
  
  ];

  deleteMessage: string = '';
  ingresoAEliminar: string | null = null;
  isModalOpen: boolean = false;

  openDeleteConfirmation(codigo: string) {
    this.ingresoAEliminar = codigo;
    this.deleteMessage = `¿Está seguro de que desea eliminar la nota de ingreso con código "${codigo}"?`;
    this.isModalOpen = true; 
  }

  closeDeleteConfirmation() {
    this.isModalOpen = false; 
    this.ingresoAEliminar = null;
  }

  onDeleteConfirmed() {
    if (this.ingresoAEliminar) {
      this.ingresos = this.ingresos.filter(
        (ingreso) => ingreso.codigo !== this.ingresoAEliminar
      );
      this.closeDeleteConfirmation();
      alert('Nota de ingreso eliminada con éxito.');
    }
  }

}
