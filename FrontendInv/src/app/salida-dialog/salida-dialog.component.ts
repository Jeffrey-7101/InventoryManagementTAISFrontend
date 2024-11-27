import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { SalidaService } from '../services/salida.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select'; // Nuevo
import { MatOptionModule } from '@angular/material/core';  // Nuevo
import { MatIconModule } from '@angular/material/icon';    // Nuevo

@Component({
  selector: 'app-salida-dialog',
  templateUrl: './salida-dialog.component.html',
  styleUrls: ['./salida-dialog.component.css'],
  standalone: true,
  imports: [ 
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule, // Add this line
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
    MatIconModule,
    
  ], 
})
export class SalidaDialogComponent implements OnInit {
  fechaSalida: string = '';
  productoSeleccionado: string = '';
  cantidad: number = 0;
  productosAgregados: any[] = [];
  cantidadTotal: number = 0;
  precioTotal: number = 0;
  productosDisponibles: any[] = [];
  salidas: any[] = []; // Lista de notas de salida


  constructor(
    public dialogRef: MatDialogRef<SalidaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private salidaService: SalidaService
  ) {}

  ngOnInit(): void {
    this.cargarProductos();

    if (this.data) {
      this.cargarNotaParaEditar(this.data);
    }
  }
  fechaSalidaInvalida(): boolean {
    return !this.fechaSalida;
  }

  cargarProductos(): void {
    this.salidaService.getAllProducts().subscribe(
      (productos) => {
        this.productosDisponibles = productos.map((producto) => ({
          id: producto.ProductID,
          name: producto.Name,
          price: producto.LastPrice,
        }));
      },
      (error) => console.error('Error al cargar productos:', error)
    );
  }

  cargarNotaParaEditar(nota: any): void {
    this.fechaSalida = nota.fecha;
    this.productosAgregados = nota.productos.map((producto: any) => {
      const productoDetalles = this.productosDisponibles.find(
        (p) => p.id === producto.ProductID
      );
      return {
        producto: productoDetalles?.name || producto.ProductID,
        id: producto.ProductID,
        cantidad: producto.Quantity,
        precio: producto.Quantity * (productoDetalles?.price || 0),
      };
    });
    this.calcularTotales();
  }

  addProducto(): void {
    if (this.cantidad > 0 && this.productoSeleccionado) {
      const producto = this.productosDisponibles.find(
        (prod) => prod.id === this.productoSeleccionado
      );

      if (!producto) {
        alert('Producto no válido');
        return;
      }

      const totalProducto = this.cantidad * producto.price;

      this.productosAgregados.push({
        producto: producto.name,
        id: producto.id,
        cantidad: this.cantidad,
        precio: totalProducto,
      });

      this.productosAgregados = [...this.productosAgregados];

      this.calcularTotales();
      this.cantidad = 0;
      this.productoSeleccionado = this.productosDisponibles[0]?.id || '';
    }
  }

  eliminarProducto(index: number): void {
    this.productosAgregados.splice(index, 1);
    this.productosAgregados = [...this.productosAgregados];
    this.calcularTotales();
  }

  calcularTotales(): void {
    this.cantidadTotal = this.productosAgregados.reduce(
      (sum, item) => sum + item.cantidad,
      0
    );
    this.precioTotal = this.productosAgregados.reduce(
      (sum, item) => sum + item.precio,
      0
    );
  }

  guardar(): void {
    const nota = {
      Date: this.fechaSalida,
      Products: this.productosAgregados.map((item) => ({
        ProductID: item.id,
        Quantity: item.cantidad,
      })),
    };

    if (this.data) {
      this.salidaService.updateNota(this.data.id, nota).subscribe(
        (response) => {
          alert('Nota actualizada exitosamente.');
          this.dialogRef.close(true);
        },
        (error) => console.error('Error al actualizar la nota:', error)
      );
    } else {
      this.salidaService.createNota(nota).subscribe(
        (response) => {
          alert('Nota creada exitosamente.');
          this.dialogRef.close(true);
        },
        (error) => console.error('Error al crear la nota:', error)
      );
    }
  }

  cargarSalidas(): void {
    this.salidaService.getAllNotas().subscribe(
      (notas: any[]) => {
        this.salidas = notas.map((nota) => ({
          id: nota.NoteID,
          cantidadTotal: nota.Products.reduce(
            (total: number, product: any) => total + product.Quantity,
            0
          ),
          precioTotal: nota.Products.reduce(
            (total: number, product: any) => total + product.Quantity * 10,
            0
          ), // Ejemplo
          fecha: nota.Date,
          productos: nota.Products,
        }));
      },
      (error) => console.error('Error al cargar las salidas:', error)
    );
  }

  cerrar(): void {
    this.dialogRef.close();
  }
}
