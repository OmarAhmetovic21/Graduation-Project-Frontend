import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, Subscriber } from 'rxjs';
import { OffersServiceService } from 'app/services/offers-service/offers.service';

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.css']
})
export class AddOfferComponent implements OnInit {
  @Input()
  name: any;
  price: any;
  amount: any;
  media: any;

  constructor(public activeModal: NgbActiveModal,
              private offersService: OffersServiceService) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.activeModal.close();
  }

  postOffers() {
    let data = {
      name: this.name,
      price: this.price,
      amount: this.amount,
      media: this.media
    }
    this.offersService.postOffers(data).subscribe((data: any)=> {
      console.log("Successfully added offer");
    } );
    this.activeModal.close();
  }



}
