import { Component } from '@angular/core';
import { ProductsService } from './../products.service';
import { ShoppingCartService } from './../shopping-cart.service';
import { Product } from './../products.service';
import { ProductItem } from './../shopping-cart.service';

/**
 * Defines the component responsible to manage the shopping cart page.
 */
@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html'
})
export class ShoppingCartComponent {
  /* Variables */
  items: Array<ProductItem> = new Array<ProductItem>();
  lstProduct: Array<Product> = new Array<Product>();
  totalPrice: number = 0;

  constructor(private shoppingCartService: ShoppingCartService, private productsService: ProductsService) { }

  /**
   * Occurs when the component is initialized
   */
  ngOnInit() {
    console.log("INITIALIZING SHOPPING-CARD");

    this.getProducts();
  }


  /**
   * First get items from shopping-cart
   * Then get information from database
   */
  getProducts() {
    this.shoppingCartService.getItems()
      .then(value => {
        // Get items from shopping-cart
        this.items = value;
        console.log("products length avant if : " + this.items.length);

        if (this.items.length > 0) {
          console.log("products length : " + this.items.length);
          for (let item of this.items) {
            this.productsService.getProduct(item.productId)
              .then(value => {
                let prod: Product = value;
                this.lstProduct.push(prod);
              });
          }
          this.sortLists();
        }
      });
  }

  /**
   * Sort lstProduct ET items => avoir une correspondance 
   * entre la liste de produit et liste d'item
   */
  sortLists() {
    let lstInt: Array<ProductItem> = new Array<ProductItem>();
    this.lstProduct.sort(this.sortJson);

    for (let i = 0; i < this.lstProduct.length; i++) {
      for (let it of this.items) {
        if (this.lstProduct[i].id == it.productId) { lstInt.push(it); }
      }
    }

    console.log(this.items);
    this.items = lstInt;
    console.log(this.items);

    this.calculatePrice();
  }

  /**
   * Sorting function for list of products
   * 
   * @param a 
   * @param b 
   */
  sortJson(a, b) {
    let nameLowerCaseA = a.name.toLowerCase();
    let nameLowerCaseB = b.name.toLowerCase();
    return nameLowerCaseA > nameLowerCaseB ? 1 : -1;
  }

  calculatePrice(){
    this.totalPrice = 0;
    for(let i = 0; i<this.lstProduct.length; i++){
      this.totalPrice += this.lstProduct[i].price * this.items[i].quantity;
    }
  }
}
