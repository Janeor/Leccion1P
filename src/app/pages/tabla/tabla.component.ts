import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Persona } from 'src/app/modelos/Persona.model';


@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent {
  acumulador?: number = 0 ;
  form!: FormGroup;
  listEliminados: Persona[] = [];
  listPersona: Persona[] = [];

  constructor(private formBuilder: FormBuilder, private router: Router) {}
  
  ngOnInit(){
    this.form = this.formBuilder.group({
      firstname: [''],
      lastname: [''],
      ci: [''],
      valor: [''],
      fechaE: [''],
    });
  }

  agregarPersona() {
    
    this.acumulador! = this.acumulador! + parseInt(this.form.value.valor);
    if (this.form.valid) {
      const persona: Persona = {
        firstname: this.form.value.firstname,
        lastname: this.form.value.lastname,
        ci: this.form.value.ci,
        valor: this.form.value.valor,
        fechaE: new Date(this.form.value.fechaE),
      };
      this.listPersona.push(persona);
      this.form.reset();
    } else {
      alert('Datos invalidos');
    }
  }

  eliminarEstudiante(indice: number, persona: Persona) {
    this.listPersona.splice(indice, 1);
    this.listEliminados.push(persona);
    this.acumulador= this.acumulador! - persona.valor!;

  }
}
