import { Component } from '@angular/core';
import { ShoppingCartService } from './shopping-cart.service';
import { ProductItem } from './shopping-cart.service';

/**
 * Defines the main component of the application.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  /** Variables */
  getPanierRequest: string = 'http://localhost:3000/api/shopping-cart/';
  nbItem: number = 0;
  items = new Array();

  constructor(private shoppingCartService : ShoppingCartService) {
    console.log("constructor");
  }

  readonly authors = [
    'Camille Goupil (1922286)',
    'Théo Charlot (1922297)'
  ];

  /**
   * Occurs when the component is initialized.
   */
  ngOnInit() {
    this.getNbItemCart();
  }


  /** 
   * Récupération du panier pour avoir le nombre d'item qui sont présents dedans 
   */
  getNbItemCart(): void {
    this.shoppingCartService.getItems()
      .then(value => {
        this.items = value;
        this.nbItem = this.items.length;
        console.log("products length : " + this.items.length);
      });
  }
}
