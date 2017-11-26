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
