import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Imagem } from './imagem.model';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
  animations: [
    trigger('banner', [
      state('escondido', style({
        opacity: 0
      })),
      state('visivel', style({
        opacity: 1
      })),
      transition('escondido <=> visivel', animate('1s ease-in')),
    ])
  ]
})

export class BannerComponent implements OnInit {

  public estado: string = 'visivel'
  public imagens: Imagem[] = [
    {estado: 'visivel', url: './assets/img_1.png'},
    {estado: 'escondido', url: './assets/img_2.png'},
    {estado: 'escondido', url: './assets/img_3.png'},
    {estado: 'escondido', url: './assets/img_4.png'},
    {estado: 'escondido', url: './assets/img_5.png'},
  ]

  public rotacaoImagens() {
    let idx: number = 0

    //esconder imagem
    for(let i: number = 0; i <= 4; i++) {
      if(this.imagens[i].estado === 'visivel') {
        this.imagens[i].estado = 'escondido'

        //idx = i === 4 ? 0 : i + 1
        if(i === 4) {
          idx = 0
        } else {
          idx = i + 1
        }
        break;
      }
    }

    //exibir imagem
    this.imagens[idx].estado = 'visivel'

    setTimeout(() => this.rotacaoImagens(), 3000)
  }

  ngOnInit(): void {
    setTimeout(() => this.rotacaoImagens(), 3000)
  }


}
