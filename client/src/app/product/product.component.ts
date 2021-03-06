import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from './../products.service';
import { Product } from './../products.service';
import { ShoppingCartService } from './../shopping-cart.service';
import { ProductItem } from './../shopping-cart.service';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { CurrencyFormat } from './../currencyPipe';

/**
 * Defines the component responsible to manage the product page.
 */
@Component({
  selector: 'product',
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit {

  product: Product = new Product();
  quantity: number;
  id: number;
  isAlreadyInCart: boolean = false;
  public saved: boolean = false;

  /**
   * Initializes a new instance of the ProductComponent class.
   *
   * @param route                   The active route.
   */
  constructor(private route: ActivatedRoute, private productsService: ProductsService, private shoppingCartService: ShoppingCartService, public router: Router) { }

  /**
   * Occurs when the component is initialized.
   */
  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');
    this.id = Number(productId);
    //get the product via the rest request
    this.productsService.getProduct(this.id)
      .then(value => {
        if (value) {
          this.product = value;
          this.shoppingCartService.getItem(this.id)
            .then(value => {
              this.isAlreadyInCart = true;
              this.quantity = value.quantity;
            })
            .catch(value => {
              this.isAlreadyInCart = false;
              this.quantity = 1;
            });
        }
        else {
          //product not existing => error page
          this.router.navigate(["/\*\*"]);
        }
      })
      .catch(value => {
        //product not existing => error page
        this.router.navigate(["/\*\*"]);
      });
  }


  addProduct() {
    let prod: ProductItem = new ProductItem();
    prod.productId = this.product.id;
    prod.quantity = this.quantity;
    if (this.isAlreadyInCart) {
      this.shoppingCartService.putItem(prod);
    }
    else {
      this.shoppingCartService.postItem(prod);
      this.isAlreadyInCart = true;
    }
    this.saved = true;
    setTimeout(function () {
      this.saved = false;
    }.bind(this), 5000);

  }
}
