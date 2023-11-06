import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { 
 BrowserAnimationsModule 
} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AcessoComponent } from './acesso/acesso.component';
import { BannerComponent } from './acesso/banner/banner.component';
import { LoginComponent } from './acesso/login/login.component';
import { CadastroComponent } from './acesso/cadastro/cadastro.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { HomeComponent } from './home/home.component';
import { PublicacoesComponent } from './home/publicacoes/publicacoes.component';
import { IncluirPublicacaoComponent } from './home/incluir-publicacao/incluir-publicacao.component';
import { ProgressoService } from './progresso.service';


@NgModule({
  declarations: [
    AppComponent,
    AcessoComponent,
    BannerComponent,
    LoginComponent,
    CadastroComponent,
    HomeComponent,
    PublicacoesComponent,
    IncluirPublicacaoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyB4v5XFOpBSbyQy5LusyCCxtCI2dM4Td08",
      authDomain: "insta-clone-ba6be.firebaseapp.com",
      databaseURL: "https://insta-clone-ba6be-default-rtdb.firebaseio.com",
      projectId: "insta-clone-ba6be",
      storageBucket: "insta-clone-ba6be.appspot.com",
      messagingSenderId: "121929076663",
      appId: "1:121929076663:web:05f92cb215ca7860b76232",
      measurementId: "G-E8V2EZX6LP"
    })
  ], 
  providers: [  AuthService, ProgressoService  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
