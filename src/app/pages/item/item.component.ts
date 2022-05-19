import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { ProductoEntero } from '../../interfaces/producto-completo-interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  productoD: ProductoEntero = {};
  id: string | undefined;

  constructor( private route: ActivatedRoute,
               public productosA: ProductosService ) { }

  ngOnInit(): void {

    this.route.params
    .subscribe(parametros =>{
     this.productosA.getProducto(parametros['id'])
     .subscribe( (producto: ProductoEntero) => {
       this.id = parametros['id'];
       this.productoD = producto;
     });
    });


  }

}
