import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../order.service';

/**
* Defines the component responsible to manage the confirmation page.
*/
@Component({
  selector: 'confirmation',
  templateUrl: './confirmation.component.html'
})
export class ConfirmationComponent {

  /* Variables */
  numOrder: number;
  userName: string;

  constructor(private orderService: OrderService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.numOrder = +params['id'];
      this.getOrder();
    });
  }

  getOrder() {
    this.orderService.getOrder(this.numOrder)
      .then(value => {
        this.userName = value.firstName + " " + value.lastName;
      });
  }
}
