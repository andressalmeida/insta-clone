import { Injectable } from '@angular/core';
import { Usuario } from './acesso/usuario.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  public tokenId: any

  constructor(
    public dbAuth: AngularFireAuth,
    public db: AngularFireDatabase,
    private router: Router
  ) { }

  public cadastrarUsuario(usuario: Usuario) {

    return this.dbAuth.createUserWithEmailAndPassword(usuario.email, usuario.senha)
      .then((res: any) => {

        delete usuario.senha

        this.db.database.ref(`usuario_detalhe/${btoa(usuario.email)}`).set(usuario)
      })
      .catch((err: any) => {
        console.log(err)
      })
  }

  public autenticarUsuario(email: string, senha: string) {
    this.dbAuth.signInWithEmailAndPassword(email, senha)
      .then((res: any) => {
        this.dbAuth.idTokenResult.subscribe((token) => {
          this.tokenId = token.token
          localStorage.setItem('token', token.token)
          this.router.navigate(['/home'])
        })
      })
      .catch((err: any) => {
        console.log(err)
      })
  }

  public autenticado(): boolean {

    let token = localStorage.getItem('token')
    if(token) {
      this.tokenId = token
    }
    return this.tokenId !== null && this.tokenId !== undefined
  }


}
