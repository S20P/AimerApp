
import {
  Component, OnInit, AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  ChangeDetectorRef
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NgForm } from '@angular/forms';
declare var Stripe: any;
declare var $: any;
declare var StripeCheckout: any;

// import { StripeService, ElementOptions, StripeCardComponent, Elements, Element as StripeElement, ElementsOptions } from "ngx-stripe";

@Component({
  selector: 'app-stripe-payment',
  templateUrl: './stripe-payment.component.html',
  styleUrls: ['./stripe-payment.component.css']
})
export class StripePaymentComponent implements OnInit {
  elements;
  card;
  stripe;

  // elementsOptions: ElementsOptions = {
  //   locale: 'es'
  // };


  constructor() { }

  private cardToken: any;

  ngOnInit() {

    // this.stripe = Stripe('pk_test_vOrfJXKetGYzsLXxHBSJSgRG'); // use your test publishable key
    // this.elements = this.stripe.elements();


    // var style = {
    //   base: {
    //     color: '#32325d',
    //     lineHeight: '18px',
    //     fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    //     fontSmoothing: 'antialiased',
    //     fontSize: '16px',
    //     '::placeholder': {
    //       color: '#aab7c4'
    //     }
    //   },
    //   invalid: {
    //     color: '#fa755a',
    //     iconColor: '#fa755a'
    //   }
    // };

    // // Create an instance of the card Element.
    // this.card = this.elements.create('card', { style: style });
    // this.card.mount('#card-element');

    // this.card.addEventListener('change', function (event) {

    //   if (event.error) {
    //     console.log("error", event.error.message);
    //   } else {
    //     console.log("error", "");
    //   }
    // });




  }

  // buy(event) {

  //   event.preventDefault();

  //   this.stripe.createToken(this.card).then(function (result) {
  //     if (result.error) {
  //       // Inform the user if there was an error.
  //       var errorElement = document.getElementById('card-errors');
  //       errorElement.textContent = result.error.message;
  //     } else {
  //       // Send the token to your server.
  //       console.log("token", result.token);

  //       var stripe = Stripe("pk_test_vOrfJXKetGYzsLXxHBSJSgRG");

  //       var token = result.token.id;
  //       //   this.stripe = Stripe('pk_test_vOrfJXKetGYzsLXxHBSJSgRG');

  //       //  Stripe.apiKey = "pk_test_vOrfJXKetGYzsLXxHBSJSgRG";
  //       var token = token.id;
  //       //Stripe.setPublishableKey('pk_test_vOrfJXKetGYzsLXxHBSJSgRG');

  //       const charge = stripe.charges.create({
  //         amount: 999,
  //         currency: 'usd',
  //         description: 'Example charge',
  //         source: token,
  //       });

  //       console.log("charge", charge);

  //     }



  //   });
  // }



  // stripeTokenHandler(token) {

  //   this.stripe = Stripe('sk_test_BQokikJOvBiI2HlWgH4olfQ2');

  //   Stripe.apiKey = "sk_test_BQokikJOvBiI2HlWgH4olfQ2";
  //   var token = token.id;


  //   const charge = this.stripe.charges.create({
  //     amount: 999,
  //     currency: 'usd',
  //     description: 'Example charge',
  //     source: token,
  //   });

  //   $.ajax({
  //     type: 'POST',
  //     url: 'https://api.stripe.com/v1/charges',
  //     headers: {
  //       Authorization: 'Bearer sk_test_YourSecretKeyHere'
  //     },
  //     data: {
  //       amount: 3000,
  //       currency: 'usd',
  //       source: token.id,
  //       description: "Charge for madison.garcia@example.com"
  //     },
  //     success: (response) => {
  //       console.log('successful payment: ', response);
  //     },
  //     error: (response) => {
  //       console.log('error payment: ', response);
  //     }
  //   })


  // }

  pay() {
    var handler = StripeCheckout.configure({
      key: 'pk_test_vOrfJXKetGYzsLXxHBSJSgRG',
      image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
      locale: 'auto',
      token: function (token) {
       console.log("token",token);
     

       $.post("http://localhost:3000/charge", {token: token}, function(res) {
        console.log("response from charge: " + res);
    })


      // var stripe = Stripe("pk_test_vOrfJXKetGYzsLXxHBSJSgRG");

    //    var token_id = token.id;
    //  console.log("token_id",token_id);

    //  const stripe = new Stripe('pk_test_vOrfJXKetGYzsLXxHBSJSgRG');

    //    const charge = stripe.charges.create({
    //      email: 'satish6073@gmail.com',
    //      amount: 999,
    //      currency: 'usd',
    //      description: 'Example charge',
    //      source: token_id,
    //    }, function (err, res) {
    //     console.log("err", err);
    //     console.log("res", res);
    //   });


     
      }
    });

    handler.open({
      name: 'Tupple Apps',
      description: '2 widgets',
      zipCode: true,
      amount: 2000
    });

    window.addEventListener('popstate', function() {
      handler.close();
    });

  }



}
