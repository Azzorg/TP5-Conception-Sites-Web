import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient) {
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
    this.http.get(this.getPanierRequest).subscribe(
      data => {
        console.log(data);
        this.items = data as Object[];
        this.nbItem = this.items.length;
        console.log("Nombre d'item dans le panier : " + this.items.length)
      },
      err => {
        console.error("Erreur : " + err);
      });
  }
}
