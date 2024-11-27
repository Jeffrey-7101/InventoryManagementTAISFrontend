import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component'; // Importar el componente
import { Product } from '../models/product.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ProductFormComponent,
    DeleteConfirmationComponent,
  ],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  product: Product = this.createEmptyProduct();
  //selectedProduct: Product | null = null; // Para edición
  selectedProduct: Product | null = null;

  products: Product[] = []; // Para listar productos

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  // Crear un producto vacío
  createEmptyProduct(): Product {
    return {
      ProductID: '',
      Description: '',
      Quantity: 0,
      LastPrice: 0,
      Category: '',
      Name: '',
    };
  }

  // Cargar todos los productos
  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data: Product[]) => {
        this.products = data;
        console.log('Productos cargados:', this.products);
      },
      error: (err) => console.error('Error al cargar productos:', err),
    });
  }

  // Crear producto
  onSubmit(): void {
    this.productService.createProduct(this.product).subscribe({
      next: (response) => {
        console.log('Producto creado:', response);
        this.loadProducts(); // Actualiza la lista
        //this.resetProductForm(); // Resetea el formulario
        this.closeModal(); // Cerrar el modal si el producto se guarda correctamente
      },
      error: (err) => console.error('Error al crear producto:', err),
    });
  }

  // Resetea el formulario de creación
  resetProductForm(): void {
    this.product = this.createEmptyProduct();
  }

  // Abrir modal de edición
  openEditModal(product: Product): void {
    this.selectedProduct = { ...product }; // Clona el producto seleccionado
  }

  // Guardar cambios en un producto
  updateProduct(): void {
    if (this.selectedProduct) {
      this.productService.updateProduct(this.selectedProduct.ProductID, this.selectedProduct).subscribe({
        next: (updated: Product) => {
          console.log('Producto actualizado:', updated);
          this.loadProducts(); // Recarga la lista
          this.selectedProduct = null; // Limpia la selección
        },
        error: (err) => console.error('Error al actualizar producto:', err),
      });
    }
  }

  closeEditModal(): void {
    this.selectedProduct = null;
  }

  // Función para abrir el modal de confirmación de eliminación
  openDeleteConfirmation(product: Product) {
    this.selectedProduct = product; // Almacenamos el producto seleccionado
    const modalElement = document.getElementById('deleteModal') as HTMLElement;
    if (modalElement) {
      modalElement.style.display = 'block'; // Mostrar el modal
    }
  }
  
  // Función para eliminar el producto
  deleteProduct() {
    if (this.selectedProduct) {
      // Lógica para eliminar el producto (por ejemplo, hacer una llamada a un servicio de backend)
      console.log('Producto eliminado:', this.selectedProduct);
      this.products = this.products.filter(product => product !== this.selectedProduct); // Eliminar de la lista
      this.selectedProduct = null; // Limpiar la selección
    }
  }


  closeModal() {
    const modalElement = document.getElementById('productModal') as HTMLElement;
    if (modalElement) {
      modalElement.style.display = 'none'; // Cerrar el modal
    }
  }
}
