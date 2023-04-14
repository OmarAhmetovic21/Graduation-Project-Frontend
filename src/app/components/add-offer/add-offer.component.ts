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
  image!: Observable<any>
  base64code!: any
  
  @Input()
  name: any;
  price: any;
  amount: any;
  media: any;

  constructor(public activeModal: NgbActiveModal,
              private offersService: OffersServiceService) { }

  ngOnInit(): void {

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
      this.image = d;
      this.base64code = d;

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
      media: this.image
    }
    this.offersService.postOffers(data).subscribe((data: any)=> {
      console.log("Uspješno ste dodali ponudu");
    } );
    this.activeModal.close();
  }



}
