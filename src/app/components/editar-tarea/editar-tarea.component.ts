import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http'; 
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TareasService } from '../../services/tareas.service';
import { Tarea } from '../../models/tarea.model';

@Component({
  selector: 'app-editar-tarea',
  standalone: true,
  imports: [CommonModule, FormsModule,HttpClientModule, RouterModule],
  providers: [TareasService],
  templateUrl: './editar-tarea.component.html',
  styleUrls: ['./editar-tarea.component.css']
})
export class EditarTareaComponent implements OnInit {
  tarea: Tarea | undefined;

  constructor(
    private tareaService: TareasService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.tareaService.getTareas().subscribe(tareas => {
      this.tarea = tareas.find(t => t.id === id);
    });
  }

  editarTarea(): void {
    if (this.tarea) {
      this.tareaService.updateTarea(this.tarea).subscribe(() => {
        this.router.navigate(['/listar']); // Redirigir después de editar
      });
    }
  }
}