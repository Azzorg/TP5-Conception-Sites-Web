import { Component, OnInit } from '@angular/core';
import { OrderService } from './../order.service';
import { Order } from './../order.service';
import { ProductItem } from './../shopping-cart.service';
import { ShoppingCartService } from './../shopping-cart.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
declare const $: any;

/**
 * Defines the component responsible to manage the order page.
 */
@Component({
  selector: 'order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  orderForm: any;
  orderId : number = 1;
  name : string;
  lastname : string;
  email : string;
  phone : string;
  creditCard : string;
  expiration : string;


  constructor(private orderService : OrderService, public router : Router, private shoppingCartService: ShoppingCartService) { }
  /**
   * Occurs when the component is initialized.
   */
  ngOnInit() {
    // Initializes the validation of the form. This is the ONLY place where jQuery usage is allowed.
    this.orderForm = $('#order-form');
    $.validator.addMethod('ccexp', function(value) {
      if (!value) {
        return false;
      }
      const regEx = /^(0?[1-9]|1[0-2])\/(0?[1-9]|[1-9][0-9])$/g;
      return regEx.test(value);
    }, 'La date d\'expiration de votre carte de crédit est invalide.');
    this.orderForm.validate({
      rules: {
        'phone': {
          required: true,
          phoneUS: true
        },
        'credit-card': {
          required: true,
          creditcard: true
        },
        'credit-card-expiry': {
          ccexp: true
        }
      }
    });
  }

  /**
   * Submits the order form.
   */
  submit(form: NgForm) {
    if (!this.orderForm.valid()) {
      return;
    }
    // TODO: Compléter la soumission des informations lorsque le formulaire soumis est valide.
    console.log(form.value);
    // get the last id in ther orders collection
    this.orderService.getOrders()
      .then(data => {
        let id = data[data.length-1].id + 1;

        let order = new Order();
        order.id = id;
        order.firstName = form.value.firstName;
        order.lastName = form.value.lastName;
        order.email = form.value.email;
        order.phone = form.value.phone;
        order.products = [];
        /* Get the list of items in the shopping-cart */
        this.shoppingCartService.getItems()
          .then(data => {

            for(let item of data){
              let prod = {
                id : item.productId,
                quantity : item.quantity
              }
              order.products.push(prod);
            }
            console.log(order);
            /* Post the order */
            this.orderService.postOrder(order)
              .then(data => {
                console.log("order posted => succed");
                this.shoppingCartService.deleteItems()
                  .then(data => {
                    this.router.navigate(["/confirmation", id]);
                  });
              })
              .catch(err => console.log("order posted => failed"))
          })
          .catch(err => {
            console.log("no products in shopping-cart => no order added ! ");
          })

      })
      /* If no order in DB => id = 1 */
      .catch(err => {
        let id = 1;

        let order = new Order();
        order.id = 1;
        order.firstName = form.value.firstName;
        order.lastName = form.value.lastName;
        order.email = form.value.email;
        order.phone = form.value.phone;
        order.products = [];
        /* Get the list of items in the shopping-cart */
        this.shoppingCartService.getItems()
          .then(data => {

            for(let item of data){
              let prod = {
                id : item.productId,
                quantity : item.quantity
              }
              order.products.push(prod);
            }
            console.log(order);
            /* Post the order */
            this.orderService.postOrder(order)
              .then(data => {
                console.log("order posted => succed");
                this.shoppingCartService.deleteItems()
                  .then(data => {
                    this.router.navigate(["/confirmation", id]);
                  });
              })
              .catch(err => console.log("order posted => failed"))
          })
          .catch(err => {
            console.log("no products in shopping-cart => no order added ! ");
          })
      })
  }
}
