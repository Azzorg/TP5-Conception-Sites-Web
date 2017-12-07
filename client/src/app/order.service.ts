import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { RequestOptions } from '@angular/http';
import { Headers } from '@angular/http';
import { Config } from './config';
import { ProductItem } from './shopping-cart.service';

/**
 * Defines an order
 */

export class ProductOrder {
    public id: number;
    public quantity: number;
}

export class Order {
    public id: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public phone: string;
    public products: ProductOrder[];
}


/**
 * Defines the service responsible to retrieve the orders from database.
 */
@Injectable()
export class OrderService {

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
     * Initializes a new instance of the OrdersService class.
     *
     * @param http                    The HTTP service to use.
     */
    constructor(private http: Http) { }



    /**
     * Gets all the orders in the database.
     *
     * @return {Promise<Order[]>}   A promise that contains the list of all orders.
     */
    getOrders(): Promise<Order[]> {
        let url = `${Config.apiUrl}/orders/`;
        return this.http.get(url)
            .toPromise()
            .then(orders => orders.json() as Order[])
            .catch(OrderService.handleError);
    }



    /**
     * Gets the item associated with the order ID specified.
     *
     * @param orderId               The order ID associated with the order to retrieve.
     * @returns {Promise<Order>}    A promise that contains the order associated with the ID specified.
     */
    getOrder(orderId: number): Promise<Order> {
        const url = `${Config.apiUrl}/orders/${orderId}`;
        return this.http.get(url)
            .toPromise()
            .then(order => order.json() as Order)
            .catch(() => null);
    }



    /**
     * Add an item inside shopping-cart
     *
     * @param order The order to post
     * @returns {Promise<any>}    A promise that contains the order posted.
     */
    postOrder(order: Order): Promise<any> {
        const url = `${Config.apiUrl}/orders/`;
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers, withCredentials: true });
        let body = JSON.stringify(order);
        return this.http.post(url, body, options)
            .toPromise()
            .then(res => res.json())
            .catch(() => null);
    }

    /**
     * delete all orders
     *
     * @returns {Promise<any>}    a promise that contains nothing.
     */
    deleteOrders(): Promise<any> {
        const url = `${Config.apiUrl}/orders`;
        return this.http.delete(url)
            .toPromise();
    }

    /**
     * delete all orders
     *
     * @param order The order to delete
     * @returns {Promise<any>}    a promise that contains nothing.
     */
    deleteOrder(orderId: number): Promise<any> {
        const url = `${Config.apiUrl}/orders/${orderId}`;
        return this.http.delete(url)
            .toPromise();
    }
}
