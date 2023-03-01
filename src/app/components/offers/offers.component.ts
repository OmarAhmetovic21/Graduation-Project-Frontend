import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {
  isDesktopDevice: any;
  constructor(private router: Router,
              private deviceService: DeviceDetectorService) { }

  ngOnInit(): void {
    this.isDesktopDevice = this.deviceService.isDesktop();
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');
  }

  open(page: any) {
    this.router.navigateByUrl('/' + page);
}

}
