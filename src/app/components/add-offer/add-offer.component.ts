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

  @Input() data: any;
  name: any;
  price: any;
  amount: any;
  media: any;
  id: any;

  constructor(public activeModal: NgbActiveModal,
              private offersService: OffersServiceService) { }

  ngOnInit(): void {
    if(this.data){
      this.name = this.data.name;
      this.price= this.data.price;
      this.amount= this.data.amount;
      this.media= this.data.media;
      this.id= this.data.id;
    }

  }

  onChange = ($event: Event)=>{
    const target = $event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    console.log(file);

    this.convertToBase64(file);

  }

  convertToBase64(file: File){
    const observable = new Observable((subscriber: Subscriber<any>)=>{
      this.readFile(file, subscriber)
    })
    observable.subscribe((d)=>{
      console.log(d)
      this.media = d;

    }
    )
  }

  readFile(file: File, subscriber: Subscriber<any>){
    const filereader = new FileReader();
    filereader.readAsDataURL(file);
    filereader.onload = () =>{
      subscriber.next(filereader.result)
      subscriber.complete()
    }

    filereader.onerror = () => {
      subscriber.error()
      subscriber.complete()
    }

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

  editOffer(){
    let post = {
      name: this.name,
      price: this.price,
      amount: this.amount,
      media: this.media,
      id: this.data.id
    }
  

    this.activeModal.close(post);

  }



}
