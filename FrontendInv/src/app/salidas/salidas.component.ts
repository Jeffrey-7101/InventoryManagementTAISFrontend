import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { HeaderComponent } from '../header/header.component';
import { HeaderSalidasComponent } from '../header-salidas/header-salidas.component';
import { SalidaService } from '../services/salida.service';
import { MatDialog } from '@angular/material/dialog';
import { SalidaDialogComponent } from '../salida-dialog/salida-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-salidas',
  standalone: true,
  templateUrl: './salidas.component.html',
  styleUrls: ['./salidas.component.css'],
  imports: [
    CommonModule,
    DeleteConfirmationComponent,
    HeaderComponent,
    HeaderSalidasComponent,
    MatSnackBarModule,  
  ],
})
export class SalidasComponent implements OnInit {
  salidas: any[] = []; // Lista de notas de salida
  deleteMessage: string = ''; // Mensaje de confirmación para eliminar
  salidaAEliminar: number | null = null; // ID de la nota seleccionada para eliminar

  constructor(private salidaService: SalidaService, public dialog: MatDialog, private snackBar: MatSnackBar, private http: HttpClient // Inyecta MatSnackBar
  ) {}

  ngOnInit(): void {
    this.cargarSalidas(); // Cargar todas las notas al inicializar el componente
  }

  /**
   * Cargar todas las notas de salida
   */
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
      (error) => {
        // Mostrar el error en un toast
        this.snackBar.open('Error al cargar las salidas: ' + error.message, 'Cerrar', {
          duration: 5000, // Duración en milisegundos
        });
      }
    );
  }

  /**
   * Descargar el archivo relacionado con una nota de salida
   * @param id ID de la nota de salida a imprimir
   */
  imprimirNota(id: string): void {
    this.salidaService.getNotaFile(id).subscribe(
      (response: any) => {
        const reader = new FileReader();
        reader.onload = () => {
          const parsedResponse = JSON.parse(reader.result as string); // Parsear el blob a JSON
          if (parsedResponse.download_url) {
            this.http.get(parsedResponse.download_url, { responseType: 'blob' }).subscribe((blob) => {
              const link = document.createElement('a');
              link.href = window.URL.createObjectURL(blob);
              link.download = `Nota_${id}.xlsx`;
              link.click();
              window.URL.revokeObjectURL(link.href);
            });
          } else {
            this.snackBar.open('Error: URL de descarga no disponible.', 'Cerrar', {
              duration: 5000,
            });
          }
        };
        reader.readAsText(response); // Convertir el blob a texto
      },
      (error) => {
        this.snackBar.open('Error al descargar la nota : ' + error.message, 'Cerrar', {
          duration: 5000,
        });
      }
    );
    
  }
  

  /**
   * Abrir el diálogo de edición para una nota
   * @param id ID de la nota a editar
   */
  editarNota(id: string): void {
    const nota = this.salidas.find((salida) => salida.id === id);
    const dialogRef = this.dialog.open(SalidaDialogComponent, {
      width: '600px',
      data: nota,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.salidaService.updateNota(id, result).subscribe(
          () => {
            alert('Nota actualizada exitosamente.');
            this.cargarSalidas(); // Recargar las notas después de actualizar
          },
          (error) => {
            // Mostrar el error en un toast
            this.snackBar.open('Error al actualizar la nota: ' + error.message, 'Cerrar', {
              duration: 5000, // Duración en milisegundos
            });
          }
        );
      }
    });
  }

  /**
   * Eliminar una nota de salida
   * @param id ID de la nota a eliminar
   */
  eliminarNota(id: string): void {
    this.salidaService.deleteNota(id).subscribe(
      () => {
        alert('Nota eliminada exitosamente.');
        this.cargarSalidas();
      },
      (error) => {
        this.snackBar.open('Error al eliminar la nota: ' + error.message, 'Cerrar', {
          duration: 5000, 
        });
      }
      
    );
  }

  /**
   * Abrir el cuadro de confirmación para eliminar una nota
   * @param id ID de la nota seleccionada
   */
  openDeleteConfirmation(id: number): void {
    this.salidaAEliminar = id;
    this.deleteMessage = `¿Está seguro de que desea eliminar la nota de salida con ID "${id}"?`;
  }

  /**
   * Confirmar y proceder con la eliminación de una nota
   */
  onDeleteConfirmed(): void {
    if (this.salidaAEliminar !== null) {
      this.eliminarNota(this.salidaAEliminar.toString());
      this.salidaAEliminar = null; // Limpiar el ID seleccionado después de eliminar
    }
  }
}
