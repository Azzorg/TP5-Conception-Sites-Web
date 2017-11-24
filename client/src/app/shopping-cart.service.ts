import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Config } from './config';

/**
 * Defines a product inside shopping-cart.
 */
export class ProductItem  {
  id: number;
  quantity : number
}

/**
 * Defines the service responsible to retrieve the products in shopping cart from server.
 */
@Injectable()
export class ShoppingCartService {

  /**
   * Handles the current error.
   *
   * @param error                   The error to handle.
   * @return {Promise<object>}      A promise object.
   */
  private static handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
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
    return this.http.get(url)
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
    return this.http.get(url)
      .toPromise()
      .then(product => product.json() as ProductItem)
      .catch(() => null);
  }


  /**
   * Add an item inside shopping-cart
   * 
   * @param product 
   */
  postItem(product: ProductItem){

  }


  /**
   * Modify an item inside-cart with its id
   * 
   * @param product 
   */
  putItem(product: ProductItem){
      
  }

}
