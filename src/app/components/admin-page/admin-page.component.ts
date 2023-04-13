import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { OffersServiceService } from 'app/services/offers-service/offers.service';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  isDesktopDevice: any;
  getOffersObservable: BehaviorSubject<any[]>;

  constructor(private router: Router,
              private deviceService: DeviceDetectorService,
              private offersService: OffersServiceService,
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

  

}
