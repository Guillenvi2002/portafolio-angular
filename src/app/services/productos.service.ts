import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductosInterface } from '../interfaces/productios-interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: ProductosInterface[]= [];

  constructor( private http: HttpClient ) {

    this.cargarProductos();
  }

  private cargarProductos() {
    this.http.get('https://angular-html-476bd-default-rtdb.europe-west1.firebasedatabase.app/productos_idx.json')
    .subscribe((resp: ProductosInterface) => {
      console.log(resp);
      this.cargando=false;
    });
  }

}
