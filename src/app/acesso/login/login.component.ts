import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>();

  constructor(private auth: AuthService) {}

  public formulario: FormGroup = new FormGroup({
    'email': new FormControl(null),
    'senha': new FormControl(null)
  });

   public exibirPainelCadastro() {
    this.exibirPainel.emit('cadastro')
  }

  public autenticar() {
    this.auth.autenticarUsuario(this.formulario.value.email, this.formulario.value.senha)
  }

}
