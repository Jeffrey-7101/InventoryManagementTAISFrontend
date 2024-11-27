import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';  // Ajusta la ruta según la ubicación de tu archivo
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'https://q7wh08wz8k.execute-api.us-east-1.amazonaws.com/dev/products';

  constructor(private http: HttpClient) {}

  // Obtener todos los productos
  getProducts(): Observable<any[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  // Obtener un producto por ID
  getProductById(productId: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${productId}`);
  }

  //Crear un nuevo producto
  createProduct(product: any): Observable<any> {
    return this.http.post(this.baseUrl, product);
  }

  //Actualizar un producto existente por ID
  updateProduct(productId: string, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/${productId}`, product);
  }

  // Eliminar un producto por ID
  deleteProduct(productId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${productId}`);
  }
  
}


