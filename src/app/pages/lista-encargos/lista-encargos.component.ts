import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { JsonService } from '../../services/json.service';
import { Encargo } from '../../models/encargo.model';

@Component({
  selector: 'app-lista-encargos',
  templateUrl: './lista-encargos.component.html',
  styleUrls: ['./lista-encargos.component.css']
})
/** Muestra y administra la lista de encargos obtenida desde GitHub Pages. */
export class ListaEncargosComponent implements OnInit {
  encargos: Encargo[] = [];
  nuevo: Encargo = { id: 0, nombre: '', descripcion: '', precio: 0 };
  editando?: Encargo;

  constructor(private jsonSvc: JsonService) {}

  /** Carga los encargos al iniciar el componente. */
  ngOnInit(): void {
    this.cargarEncargos();
  }

  /** Solicita los encargos al servicio. */
  cargarEncargos(): void {
    this.jsonSvc.getEncargos().subscribe(data => (this.encargos = data));
  }

  /** Envía un nuevo encargo. */
  agregar(form: NgForm): void {
    if (form.invalid) return;
    this.jsonSvc.addEncargo(this.nuevo).subscribe(() => {
      this.cargarEncargos();
      form.resetForm();
    });
  }

  /** Prepara un encargo para edición. */
  editar(encargo: Encargo): void {
    this.editando = { ...encargo };
  }

  /** Guarda los cambios realizados. */
  actualizar(form: NgForm): void {
    if (!this.editando) return;
    this.jsonSvc.updateEncargo(this.editando).subscribe(() => {
      this.cargarEncargos();
      this.cancelar();
    });
  }

  /** Elimina un encargo por su id. */
  eliminar(id: number): void {
    this.jsonSvc.deleteEncargo(id).subscribe(() => this.cargarEncargos());
  }

  /** Sale del modo edición. */
  cancelar(): void {
    this.editando = undefined;
  }
}
