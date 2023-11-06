import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { DbService } from 'src/app/db.service';

@Component({
  selector: 'app-publicacoes',
  templateUrl: './publicacoes.component.html',
  styleUrls: ['./publicacoes.component.css']
})
export class PublicacoesComponent implements OnInit {

public publicacoes: any

  constructor(
    private db: DbService,
    public auth: AngularFireAuth
    ) {}

  ngOnInit() {
      this.atualizarTimeline()
  }

  public atualizarTimeline() {

    let email: string

    this.auth.onAuthStateChanged((user) => {
      email = user.email
      this.db.buscarPublicacoes(email).then((publicacoes) => {
        this.publicacoes = publicacoes
      })
    })
  }

}
