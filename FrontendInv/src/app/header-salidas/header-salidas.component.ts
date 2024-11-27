import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SalidaDialogComponent } from '../salida-dialog/salida-dialog.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header-salidas',
  standalone: true,
  templateUrl: './header-salidas.component.html',
  styleUrls: ['./header-salidas.component.css'],
  imports: [MatButtonModule, MatDialogModule], // Import necessary modules
})
export class HeaderSalidasComponent {
  constructor(private dialog: MatDialog) {}

  abrirDialogo(data?: any): void {
    const dialogRef = this.dialog.open(SalidaDialogComponent, {
      width: '600px',
      data: data || null, // Pass data for editing or null for creating
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Nota guardada:', result);
      }
    });
  }
}
