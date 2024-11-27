import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SalidaService {
  private apiBaseUrl = 'https://s2nzokwsie.execute-api.us-east-1.amazonaws.com/dev/outbound-notes';

  constructor(private http: HttpClient) {}

  /**
   * Obtener todas las notas de salida
   * @returns Observable con todas las notas de salida
   */
  getAllNotas(): Observable<any> {
    return this.http.get(`${this.apiBaseUrl}`);
  }

  /**
   * Obtener una nota de salida por ID
   * @param noteId ID de la nota de salida
   * @returns Observable con la nota de salida especificada
   */
  getNotaById(noteId: string): Observable<any> {
    return this.http.get(`${this.apiBaseUrl}/${noteId}`);
  }

  /**
   * Crear una nueva nota de salida
   * @param nota Datos de la nota de salida
   * @returns Observable con la respuesta de creación
   */
  createNota(nota: any): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}`, nota);
  }

  /**
   * Actualizar una nota de salida existente
   * @param noteId ID de la nota de salida
   * @param nota Datos actualizados de la nota
   * @returns Observable con la respuesta de actualización
   */
  updateNota(noteId: string, nota: any): Observable<any> {
    return this.http.put(`${this.apiBaseUrl}/${noteId}`, nota);
  }

  /**
   * Eliminar una nota de salida por ID
   * @param noteId ID de la nota de salida a eliminar
   * @returns Observable con la respuesta de eliminación
   */
  deleteNota(noteId: string): Observable<any> {
    return this.http.delete(`${this.apiBaseUrl}/${noteId}`);
  }

  /**
   * Obtener el archivo relacionado con una nota de salida
   * @param noteId ID de la nota de salida
   * @returns Observable con el archivo relacionado (tipo Blob)
   */
  getNotaFile(noteId: string): Observable<Blob> {
    return this.http.get(`${this.apiBaseUrl}/${noteId}/file`, { responseType: 'blob' });
  }

  getProductDetails(productId: string): Observable<any> {
    return this.http.get<any>(`https://q7wh08wz8k.execute-api.us-east-1.amazonaws.com/dev/products/${productId}`);
  }
  
  getAllProducts(): Observable<any[]> {
    const productApiUrl = 'https://q7wh08wz8k.execute-api.us-east-1.amazonaws.com/dev/products'; // Reemplaza con tu URL base
    return this.http.get<any[]>(productApiUrl);
  }
  
  
}
