import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductosInterface } from '../interfaces/productios-interface';
import { Resolve } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: ProductosInterface[]= [];
  productosFiltrados: ProductosInterface[] = [];
  test: any;

  constructor( private http: HttpClient ) {

    this.cargarProductos();
  }

  private cargarProductos() {

    return new Promise<void>((resolve,reject)=>{

      this.http.get('https://angular-html-476bd-default-rtdb.europe-west1.firebasedatabase.app/productos_idx.json')
    .subscribe((resp: any) => {
      this.productos = resp;
      this.cargando=false;
      resolve();
      });
    });
  }

  getProducto(id: string) {
    return this.http.get(`https://angular-html-476bd-default-rtdb.europe-west1.firebasedatabase.app/productos/${id}.json`);

  }

  buscarProducto (termino:string){

    if(this.productos.length === 0){
      // cargar productos
      this.cargarProductos().then(()=>{
        // ejecutar después de tener los productos
        // Aplicar filtro
        this.filtrarProductos(termino);
      });
    } else {
      this.filtrarProductos(termino);
    }
/* 
    this.productosFiltrados = this.productos.filter( producto=>{
      return true;
    }); */

    console.log(this.productosFiltrados);

  }

  /* private filtrarProductos( termino: string) {

    this.productos.forEach(prod =>{
        if(prod.categoria !== undefined){
          this.test = prod.categoria;
          if(this.test.indexOf(termino) > 0){
            this.productosFiltrados.push(prod);
            console.log(prod)
        }
        }
    })
    
  } */

  private filtrarProductos( termino: string ) {

    // console.log(this.productos);
    this.productosFiltrados = [];

    termino = termino.toLocaleLowerCase();

    this.productos.forEach( prod => {

      const tituloLower = prod.titulo?.toLocaleLowerCase();

      if ( prod.categoria!.indexOf( termino ) >= 0 || tituloLower!.indexOf( termino ) >= 0  ) {
        this.productosFiltrados.push( prod );
      }

    });


  }


}
