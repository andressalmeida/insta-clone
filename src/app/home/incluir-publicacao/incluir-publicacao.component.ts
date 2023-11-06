import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup } from '@angular/forms';
import { DbService } from 'src/app/db.service';
import { ProgressoService } from 'src/app/progresso.service';
import { Observable, Subject, interval } from 'rxjs';
import 'rxjs/operators'

@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.css']
})
export class IncluirPublicacaoComponent implements OnInit {

  @Output() public atualizarTimeline: EventEmitter<any> = new EventEmitter();

  public email: string = ''
  private imagem: any = null

  public progressoPublicacao: string = 'pendente'
  public porcentagemUpload: number = 0
  public interromperUpload: boolean = false

  public formulario: FormGroup = new FormGroup({
    'legenda': new FormControl(null)
  })

  constructor(
    private db: DbService,
    public dbAuth: AngularFireAuth,
    private progresso: ProgressoService,
    ) {

  }

  ngOnInit(): void {
    this.dbAuth.onAuthStateChanged((user) => {
      this.email = user.email;
    })
  }


  public publicar() {
    this.interromperUpload = false

    this.db.publicar({
      email: this.email,
      legenda: this.formulario.value.legenda,
      imagem: this.imagem[0]
    })

    let statusUpload = interval(500)

    const sub = statusUpload.subscribe(() => {
        this.progressoPublicacao = 'andamento'
        this.porcentagemUpload = Math.round(this.progresso.estado)

        if(this.progresso.status === 'concluido') {
          sub.unsubscribe()
          this.progressoPublicacao = 'concluido'
          this.atualizarTimeline.emit()
        }

        if(this.interromperUpload === true) {
          sub.unsubscribe()
          this.progressoPublicacao = 'pendente'
        }
      })
  }

  public preparaUpload(event: Event): void {
   this.imagem = (<HTMLInputElement>event.target).files
  }

  public resetarStatus() {
     this.progressoPublicacao = 'pendente'
     this.interromperUpload = true
  }
}
