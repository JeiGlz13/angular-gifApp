import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
})
export class SearchComponent {

  @ViewChild('txtBuscar') textBuscar!: ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService ) {}

  public buscar(){
    const valor = this.textBuscar.nativeElement.value.trim();
    if (valor.length > 0) {
      this.gifsService.buscarGifs(valor);
      this.textBuscar.nativeElement.value = '';
    }
  }
}
