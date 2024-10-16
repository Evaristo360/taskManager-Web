import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import { Router, RouterModule } from '@angular/router';
import { TareasService } from '../../services/tareas.service';
import { Tarea } from '../../models/tarea.model';

@Component({
  selector: 'app-crear-tarea',
  standalone: true,
  imports: [CommonModule,FormsModule,HttpClientModule, RouterModule],
  providers: [TareasService],
  templateUrl: './crear-tarea.component.html',
  styleUrls: ['./crear-tarea.component.css']
})
export class CrearTareaComponent {
  nuevaTarea: Tarea = { id: 0, titulo: '',descripcion:'', estado: 0, fechaCreacion: new Date() }; // Estado inicial

  constructor(private tareaService: TareasService, private router: Router) { }

  crearTarea(): void {
    this.tareaService.addTarea(this.nuevaTarea).subscribe(
      () => {
        this.router.navigate(['/listar']);
      },
      error => {
        console.error('Error creating tarea:', error);
      }
    );
  }
}