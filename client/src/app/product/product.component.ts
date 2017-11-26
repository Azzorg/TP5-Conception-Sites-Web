import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from './../products.service';
import { Product } from './../products.service';
import { ShoppingCartService } from './../shopping-cart.service';
import { ProductItem } from './../shopping-cart.service';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

/**
 * Defines the component responsible to manage the product page.
 */
@Component({
  selector: 'product',
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit {

  product : Product = new Product();
  quantity : number;
  id : number;
  price : string;

  /**
   * Initializes a new instance of the ProductComponent class.
   *
   * @param route                   The active route.
   */
  constructor(private route: ActivatedRoute, private productsService : ProductsService, private shoppingCartService : ShoppingCartService, public router : Router) { }

  /**
   * Occurs when the component is initialized.
   */
  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');
    this.id = Number(productId);
    //get the product via the rest request
    this.productsService.getProduct(this.id)
      .then(value => {
        this.product = value;
        console.log("ID PRODUCT : " + this.id);
        let re = /\./;
        this.price = this.product.price.toString().replace(re, ',');
        this.shoppingCartService.getItem(this.id)
          .then(value => {
            this.quantity = value.quantity;
            console.log("quantity : " + value.quantity);
          })
          .catch(value => {
            this.quantity = 1;
          });
      })
      .catch(value => {
        //product not existing => error page
        this.router.navigate(["/\*\*"]);
      });
  }


  addProduct(){
    let prod: ProductItem = new ProductItem();
    prod.productId = this.product.id;
    prod.quantity = this.quantity;
    this.shoppingCartService.postItem(prod)
    .catch(err => {
      console.log("//ERREUR : " + err.toString());
    });
  }
}
