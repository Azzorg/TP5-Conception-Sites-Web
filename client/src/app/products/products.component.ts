import { Component, OnInit } from '@angular/core';
import { ProductsService } from './../products.service';
import { Product } from './../products.service';
import { Http } from '@angular/http';
import { CurrencyFormat } from './../currencyPipe';

/**
 * Defines the component responsible to manage the display of the products page.
 */
@Component({
  selector: 'products',
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {
  // TODO: À compléter
  countProducts: number;
  lstProducts: Array<Product> = new Array<Product>();
  category: string = "all";
  criteria: string = "price-asc";

  constructor(private productsService: ProductsService) { }

  /**
   * Occurs when the component is initialized.
   */
  ngOnInit() {
    this.getProducts();
  }

  changeCriteria(criteria: string) {
    this.criteria = criteria;
    this.getProducts();
  }

  changeCategory(category: string) {
    this.category = category;
    this.getProducts();
  }

  getProducts() {
    //get the products list
    this.productsService.getProducts(this.criteria, this.category)
      .then(value => {
        this.lstProducts = value;
        this.countProducts = this.lstProducts.length;
      });
  }

}
