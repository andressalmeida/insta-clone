import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ProgressoService } from './progresso.service';

@Injectable({
  providedIn: 'root'
})
export class DbService {



  public publicar(publi: any) {
    this.db.database.ref(`publicacoes/${btoa(publi.email)}`).push({
      legenda: publi.legenda,
    }).then((res) => {
      let nomeImagem = res.key

      this.storage.upload(`imagens/${nomeImagem}`, publi.imagem).percentageChanges().forEach(
        (snapshot) => {
          this.progresso.status = 'andamento'
          this.progresso.estado = snapshot
        }
      ).catch(
        (err) => {
          this.progresso.status = 'erro'
        }
      ).finally(
        () => {
          this.progresso.status = 'concluido'
        }
      )

    })
  }

  public buscarPublicacoes(email: string): Promise<any> {

    return new Promise<any>((resolve, reject) => {

      this.db.database.ref(`publicacoes/${btoa(email)}`)
        .orderByKey()
        .once('value')
        .then((snapshot) => {

          let publicacoes: Array<any> = []

          snapshot.forEach((child) => {

            let publicacao = child.val()
            publicacao.key = child.key

            publicacoes.push(publicacao)

          })
          return publicacoes.reverse()
        })
        .then((publicacoes: any) => {
          publicacoes.forEach((publicacao) => {

            this.storage.storage.ref()
              .child(`imagens/${publicacao.key}`)
              .getDownloadURL()
              .then((url: string) => {
                publicacao.url_imagem = url

                this.db.database.ref(`usuario_detalhe/${btoa(email)}`)
                  .once('value')
                  .then((snapshot) => {

                    publicacao.nome_usuario = snapshot.val().nome_usuario
                  })
                resolve(publicacoes)
              })
          })
        })

    })
  }

  constructor(
    public db: AngularFireDatabase,
    public storage: AngularFireStorage,
    private progresso: ProgressoService
  ) { }
}
