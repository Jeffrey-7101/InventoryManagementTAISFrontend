import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ingreso-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './ingreso-form.component.html',
  styleUrls: ['./ingreso-form.component.css'],
})
export class IngresoFormComponent {
  codigoIngreso: string = '';
  fechaIngreso: string = '';
  productoSeleccionado: string = 'Libro 1';
  cantidad: number = 0;

  productosAgregados: Array<{ producto: string; cantidad: number; precio: number }> = [];
  cantidadTotal: number = 0;
  precioTotal: number = 0;

  preciosProductos: { [key: string]: number } = {
    'Libro 1': 10,
    'Libro 2': 20,
    'Libro 3': 30,
    'Libro 4': 40,
  };

  get productosDisponibles() {
    return Object.keys(this.preciosProductos);
  }

  addProducto() {
    if (this.cantidad > 0 && this.productoSeleccionado) {
      const precioUnitario = this.preciosProductos[this.productoSeleccionado] || 0;
      const totalProducto = this.cantidad * precioUnitario;

      this.productosAgregados.push({
        producto: this.productoSeleccionado,
        cantidad: this.cantidad,
        precio: totalProducto,
      });

      this.actualizarTotales();
      this.cantidad = 0;
      this.productoSeleccionado = 'Libro 1';
    }
  }

  eliminarProducto(index: number) {
    this.productosAgregados.splice(index, 1);
    this.actualizarTotales();
  }

  actualizarTotales() {
    this.cantidadTotal = this.productosAgregados.reduce((sum, item) => sum + item.cantidad, 0);
    this.precioTotal = this.productosAgregados.reduce((sum, item) => sum + item.precio, 0);
  }
}
