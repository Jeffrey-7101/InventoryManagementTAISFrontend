import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component'; // Asegúrate de que la ruta sea correcta
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { ProductFormComponent } from '../product-form/product-form.component';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model'; // Importa la interfaz Product

@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [
    CommonModule,
    DeleteConfirmationComponent,
    HeaderComponent,
    FormsModule,
    ProductFormComponent, 
    // Asegúrate de incluir todos los componentes standalone que usas
  ],
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css']
})

export class ProductTableComponent implements OnInit {
  products: Product[] = []; // Lista de productos con la interfaz Product
  selectedItem: string = ''; // Producto seleccionado para eliminar
  selectedProduct: Product | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts(); // Cargar productos al iniciar el componente
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data: Product[]) => {
        this.products = data;  // Asigna los datos a la variable 'products'
      },
      error: (err) => console.error('Error al cargar productos:', err),
    });
  }
    

  //carga de datos al formulario de edición
  editProduct(productId: string): void {
    this.productService.getProductById(productId).subscribe({
      next: (product: Product) => {
        console.log('Producto cargado para editar:', product);
        this.selectedProduct = product; // Asigna el producto a editar
      },
      error: (err) => console.error('Error al cargar el producto:', err),
    });
  }

  //manejo de edicion y envio de cambios
  onSubmitEdit(): void {
    if (this.selectedProduct) {
      this.productService.updateProduct(this.selectedProduct.ProductID, this.selectedProduct).subscribe({
        next: (updatedProduct: Product) => {
          console.log('Producto actualizado:', updatedProduct);
          this.loadProducts(); // Recarga la lista
          this.selectedProduct = null; // Limpia la selección
        },
        error: (err) => console.error('Error al actualizar producto:', err),
      });
    }
  }
  

  prepareDelete(item: string): void {
    if (item) {
      this.selectedItem = item;
    } else {
      console.error('No se ha seleccionado un producto para eliminar');
    }
  }
  
  onDeleteConfirmed(): void {
    if (this.selectedItem) {
      this.productService.deleteProduct(this.selectedItem).subscribe({
        next: () => {
          //console.log(`Producto eliminado: ${this.selectedItem}`);
          alert('Producto eliminado con éxito'); // Mensaje de éxito
          this.loadProducts(); // Recargar productos tras eliminar
        },
        error: (err) => {
          console.error('Error al eliminar producto:', err);
          alert('Error al eliminar el producto'); // Mensaje de error
        },
      });
    }
  }
  
}
