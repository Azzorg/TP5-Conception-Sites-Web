import { Component } from '@angular/core';
import { ProductsService } from './../products.service';
import { ShoppingCartService } from './../shopping-cart.service';
import { Product } from './../products.service';
import { ProductItem } from './../shopping-cart.service';
import { CurrencyFormat } from './../currencyPipe';

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
  category: string = "all";
  criteria: string = "alpha-asc";

  constructor(private shoppingCartService: ShoppingCartService, private productsService: ProductsService) { }

  /**
   * Occurs when the component is initialized
   */
  ngOnInit() {
    this.lstProduct = new Array<Product>();

    this.getProducts();
  }


  /**
   * First get items from shopping-cart and all products inside database
   * Then get products which corresponding to items
   */
  getProducts() {

    let requ: [Promise<Product[]>, Promise<ProductItem[]>] = [this.productsService.getProducts(this.criteria, this.category), this.shoppingCartService.getItems()];

    Promise.all(requ)
      .then((results: any[]) => {
        this.items = results[1];

        for (let j = 0; j < this.items.length; j++) {
          for (let i = 0; i < results[0].length; i++) {
            if (results[0][i].id == this.items[j].productId) { this.lstProduct.push(results[0][i]); }
          }
        }
        this.sortLists();
      })
      .catch(err => { });
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

    this.items = lstInt;

    this.calculatePrice();
  }


  /**
   * Removing all items in shopping-cart
   */
  deleteShoppingCart() {
    let responseConfirm = confirm("Voulez vous supprimer tout le panier?");

    if (responseConfirm == true) {
      this.shoppingCartService.deleteItems()
        .then(value => {

          this.ngOnInit();
        });
    }
  }


  /**
   * Delete an item in shopping-cart with its id
   * 
   * @param id 
   */
  deleteItem(id: number) {
    let responseConfirm = confirm("Voulez vous supprimer ce produit du panier?");

    if (responseConfirm == true) {
      this.shoppingCartService.deleteItem(id)
        .then(value => {
          this.ngOnInit();
        });
    }
  }


  /**
   * Remove quantity of the item with this id
   * 
   * @param id 
   */
  removeQuantity(id: number) {
    let prod: ProductItem;
    let found = false;

    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].productId === id) {
        prod = this.items[i];
        found = true;
      }
    }

    if (found) {
      prod.quantity--;

      this.shoppingCartService.putItem(prod)
        .then(value => {
          this.ngOnInit();
        });
    }
  }


  /**
   * Add quantity of the item with this id
   * 
   * @param id 
   */
  addQuantity(id: number) {
    let prod: ProductItem;
    let found = false;

    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].productId === id) {
        prod = this.items[i];
        found = true;
      }
    }

    if (found) {
      prod.quantity++;

      this.shoppingCartService.putItem(prod)
        .then(value => {
          this.ngOnInit();
        });
    }
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


  /**
   *  To calculate the total price of shopping-cart
   */
  calculatePrice() {
    this.totalPrice = 0;
    for (let i = 0; i < this.lstProduct.length; i++) {
      this.totalPrice += this.lstProduct[i].price * this.items[i].quantity;
    }
  }
}
