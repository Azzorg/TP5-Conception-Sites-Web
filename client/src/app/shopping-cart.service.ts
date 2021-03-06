import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { RequestOptions } from '@angular/http';
import { Headers } from '@angular/http';
import { Config } from './config';
import { AppComponent } from './app.component';
import { EventEmitter } from '@angular/core';

/**
 * Defines a product inside shopping-cart.
 */
export class ProductItem {
  productId: number;
  quantity: number
}

/**
 * Defines the service responsible to retrieve the products in shopping cart from server.
 */
@Injectable()
export class ShoppingCartService {

  nbItemsChange: EventEmitter<any> = new EventEmitter();

  /**
   * Handles the current error.
   *
   * @param error                   The error to handle.
   * @return {Promise<object>}      A promise object.
   */
  private static handleError(error: any): Promise<any> {
    return Promise.reject(error.feedbackMessage || error);
  }

  /**
   * Initializes a new instance of the ProductsService class.
   *
   * @param http                    The HTTP service to use.
   */
  constructor(private http: Http) { }

  /**
   * Gets all the items from shopping-cart.
   *
   * @return {Promise<ProductItem[]>}   The category of the product. The default value is "all".
   */
  getItems(): Promise<ProductItem[]> {
    let url = `${Config.apiUrl}/shopping-cart`;
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.get(url, options)
      .toPromise()
      .then(products => products.json() as ProductItem[])
      .catch(ShoppingCartService.handleError);
  }


  /**
   * Gets the item associated with the product ID specified.
   *
   * @param productId               The product ID associated with the product to retrieve.
   * @returns {Promise<Product>}    A promise that contains the product associated with the ID specified.
   */
  getItem(productId: number): Promise<ProductItem> {
    const url = `${Config.apiUrl}/shopping-cart/${productId}`;
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.get(url, options)
      .toPromise()
      .then(product => product.json() as ProductItem)
      .catch(() => null);
  }


  /**
   * Add an item inside shopping-cart
   *
   * @param product
   */
  postItem(product: ProductItem): Promise<any> {
    const url = `${Config.apiUrl}/shopping-cart`;
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    let body = JSON.stringify(product);
    return this.http.post(url, body, options)
      .toPromise()
      .then(res => {
        this.nbItemsChange.emit('change');
      })
      .catch(() => { });
  }


  /**
   * Modify an item inside-cart with its id
   *
   * @param product
   */
  putItem(product: ProductItem): Promise<any> {
    const url = `${Config.apiUrl}/shopping-cart/${product.productId}`;
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    let prod = { "quantity": product.quantity };
    let body = JSON.stringify(prod);
    return this.http.put(url, body, options)
      .toPromise()
      .then(res => {
        this.nbItemsChange.emit('change');
      })
      .catch(() => { });
  }

  deleteItems(): Promise<any> {
    const url = `${Config.apiUrl}/shopping-cart`;
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.delete(url, options)
      .toPromise()
      .then(data => {
        this.nbItemsChange.emit('change');
      });
  }

  deleteItem(productId: number): Promise<any> {
    const url = `${Config.apiUrl}/shopping-cart/${productId}`;
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.delete(url, options)
      .toPromise()
      .then(data => {
        this.nbItemsChange.emit('change');
      });
  }

}
