import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { OffersServiceService } from 'app/services/offers-service/offers.service';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import {AddOfferComponent} from '../add-offer/add-offer.component';
import { ModalService } from 'app/services/modal-service/modal.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  isDesktopDevice: any;
  objectData: any;
  getOffersObservable: BehaviorSubject<any[]>;

  constructor(private router: Router,
              private deviceService: DeviceDetectorService,
              private offersService: OffersServiceService,
              private modalService: ModalService,
              private sanitizer: DomSanitizer) {
                this.getOffersObservable = new BehaviorSubject<any[]>([]);
               }

  ngOnInit(): void {
  this.isDesktopDevice = this.deviceService.isDesktop();
  var navbar = document.getElementsByTagName('nav')[0];
  navbar.classList.add('navbar-transparent');
  this.getOffers();
  }

  open(page: any) {
    this.router.navigateByUrl('/' + page);
    
  }

  getOffers() {
    this.offersService.getOffers().subscribe((data: any) => {
      // resp.json().data
      this.getOffersObservable.next(data);
      console.log(data);
    })
  }

  deleteOffers(id: any) {
    if(confirm("Are you sure you want to delete this offer")) {
      console.log("Implement delete functionality here");
      this.offersService.deleteOffers(id).subscribe((data: any) => {
        this.getOffers();
      });
    }
    

  }


  openAddEditOffer(data: any){

   this.modalService.openAddOffer(data).then((data) => {
    if(data.id) {
      let post = {
        name: data.name,
        price: data.price,
        amount: data.amount,
        media: data.media,
      }
      this.offersService.editOffer(post, data.id).subscribe((data: any)=> {
        console.log("Successfully updated offer");
        this.getOffers();
      } );
     
    } else {
      this.offersService.postOffers(data).subscribe((data: any)=> {
        console.log("Successfully added offer");
        this.getOffers();
      } );
    }
    
  })
  .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));

    }
  
    logout(){
      sessionStorage.clear();
        this.router.navigateByUrl('/index');
    }

}
