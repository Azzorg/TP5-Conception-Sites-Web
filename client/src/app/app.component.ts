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
  isHidden = true;

  constructor(private shoppingCartService: ShoppingCartService) {
    shoppingCartService.nbItemsChange.subscribe(() => {
      this.getNbItemCart();
    });
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
  public getNbItemCart(): void {
    this.shoppingCartService.getItems()
      .then(value => {
        this.items = value;
        this.nbItem = 0;
        for (let item of this.items) {
          this.nbItem += item.quantity;
        }
        if (this.nbItem > 0) {
          this.isHidden = false;
        }
        else {
          this.isHidden = true;
        }
      });
  }
}
