import { Routes } from '@angular/router';
import { ListarTareasComponent } from './components/listar-tareas/listar-tareas.component';
import { DetalleTareaComponent } from './components/detalle-tarea/detalle-tarea.component';
import { CrearTareaComponent } from './components/crear-tarea/crear-tarea.component';
import { EditarTareaComponent } from './components/editar-tarea/editar-tarea.component';

export const routes: Routes = [
  { path: '', redirectTo: 'listar', pathMatch: 'full' },
  { path: 'listar', component: ListarTareasComponent },
  { path: 'detalle/:id', component: DetalleTareaComponent },
  { path: 'crear', component: CrearTareaComponent },
  { path: 'editar/:id', component: EditarTareaComponent }
];