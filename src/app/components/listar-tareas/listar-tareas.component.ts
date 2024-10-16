import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; 
import { TareasService } from '../../services/tareas.service';
import { Tarea } from '../../models/tarea.model';

@Component({
  selector: 'app-listar-tareas',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  providers: [TareasService],
  templateUrl: './listar-tareas.component.html',
  styleUrls: ['./listar-tareas.component.css']
})
export class ListarTareasComponent implements OnInit {
  tareas: Tarea[] = [];

  constructor(private tareasService: TareasService) {}

  ngOnInit(): void {
    this.cargarTareas();
  }

  cargarTareas(): void {
    this.tareasService.getTareas().subscribe(data => {
      this.tareas = data;
    });
  }

  eliminarTarea(id: number): void {
    this.tareasService.deleteTarea(id).subscribe(() => {
      this.cargarTareas();
    });
  }

  actualizarEstado(tarea: Tarea): void {
    let estado = tarea.estado;
    tarea.estado = Number(estado);
    this.tareasService.updateTarea(tarea).subscribe(() => {
      console.log('Estado actualizado:', tarea);
    });
  }
}