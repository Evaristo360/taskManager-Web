import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { TareasService } from '../../services/tareas.service';
import { Tarea } from '../../models/tarea.model';

@Component({
  selector: 'app-detalle-tarea',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  providers: [TareasService, DatePipe],
  templateUrl: './detalle-tarea.component.html',
  styleUrls: ['./detalle-tarea.component.css']
})
export class DetalleTareaComponent implements OnInit {
  tarea: Tarea | undefined;
  tareaLoaded = false;

  constructor(
    private route: ActivatedRoute,
    private tareasService: TareasService,
    private router: Router,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.cargarTarea();
  }

  cargarTarea(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.tareasService.getTarea(+id).subscribe(data => {
        console.log('Datos de tarea:', data); // Verifica los datos recibidos
        if (data) {
          this.tarea = data;
          this.tareaLoaded = true;
        } else {
          console.error('Tarea no encontrada, redirigiendo a /listar');
          this.router.navigate(['/listar']);
        }
      }, error => {
        console.error('Error al cargar la tarea:', error);
        this.router.navigate(['/listar']);
      });
    } else {
      console.error('ID de tarea no encontrado en la ruta, redirigiendo a /listar');
      this.router.navigate(['/listar']);
    }
  }
  
  formatearFecha(fecha?: Date): string | null {
    if (!fecha) {
      return null;
    }
    return this.datePipe.transform(fecha, 'dd/MM/yyyy HH:mm');
  }
}