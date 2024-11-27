import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.css'],
  standalone: true,
})
export class DeleteConfirmationComponent {
  @Input() title: string = 'Eliminar'; 
  @Input() message: string = '¿Está seguro de que desea realizar esta acción?'; 
  @Output() confirm = new EventEmitter<void>(); 

  onConfirm() {
    this.confirm.emit(); // Emitir evento para confirmar eliminación
    const modalElement = document.getElementById('deleteModal') as HTMLElement;
    if (modalElement) {
      modalElement.style.display = 'none'; // Cerrar el modal
    }
  }

  onCancel() {
    const modalElement = document.getElementById('deleteModal') as HTMLElement;
    if (modalElement) {
      modalElement.style.display = 'none'; // Cerrar el modal en caso de cancelar
    }
  }
}
