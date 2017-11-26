import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Config } from './config';
import { ProductItem } from './shopping-cart.service';

/**
 * Defines an order
 */
export class Order {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    products: ProductItem[];
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
        console.error('An error occurred', error);
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
     * @return {Promise<Order[]>}   The category of the product. The default value is "all".
     */
    getOrders(): Promise<Order[]> {
        let url = `${Config.apiUrl}/order/`;
        return this.http.get(url)
            .toPromise()
            .then(orders => orders.json() as Order[])
            .catch(OrderService.handleError);
    }



    /**
     * Gets the item associated with the order ID specified.
     *
     * @param orderId               The order ID associated with the order to retrieve.
     * @returns {Promise<Order>}    A promise that contains the product associated with the ID specified.
     */
    getOrder(orderId: number): Promise<Order> {
        const url = `${Config.apiUrl}/order/${orderId}`;
        return this.http.get(url)
            .toPromise()
            .then(order => order.json() as Order)
            .catch(() => null);
    }

}
