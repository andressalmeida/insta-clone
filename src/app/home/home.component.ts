import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  @ViewChild('publicacoes') public publicacoes: any


  constructor(private auth: AuthService) {}


  public sair() {
    this.auth.logout()
  }

  public atualizarTimeline() {
    this.publicacoes.atualizarTimeline()
  }

}
