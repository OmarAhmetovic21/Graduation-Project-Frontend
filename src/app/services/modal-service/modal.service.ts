import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddOfferComponent } from 'app/components/add-offer/add-offer.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private modalService: NgbModal) { }

  public openAddOffer(){
    const modalRef = this.modalService.open(AddOfferComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
      });
  }
}
