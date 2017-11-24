import { Component, OnInit } from '@angular/core';
import { ProductsService } from './../products.service';
import { Product } from './../products.service';
import { Http } from '@angular/http';

/**
 * Defines the component responsible to manage the display of the products page.
 */
@Component({
  selector: 'products',
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit{
  // TODO: À compléter
  countProducts : number;
  lstProducts : Array<Product> = new Array<Product>();
  category : string = "all";
  criteria : string = "price-asc";

  constructor(private productsService : ProductsService) {}

  /**
   * Occurs when the component is initialized.
   */
  ngOnInit() {
    console.log("INITIALIZING PRODUCTS");
    this.getProducts();
  }

  getProducts(){
    //get the products list
    this.productsService.getProducts(this.criteria, this.category)
      .then(value => {
        this.lstProducts = value;
        console.log("products length : " + this.lstProducts.length);
      });

  }

}
