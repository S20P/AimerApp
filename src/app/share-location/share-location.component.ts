import { Component, OnInit ,TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-share-location',
  templateUrl: './share-location.component.html',
  styleUrls: ['./share-location.component.css']
})
export class ShareLocationComponent implements OnInit {

  modalRef: BsModalRef;
  constructor(private modalService: BsModalService, private router: Router) {}

  ngOnInit() {
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }
 
  confirm(): void {
    this.router.navigate(['swipe-cards']);
	  this.modalRef.hide();
	
  }
 
  decline(): void {
  this.router.navigate(['swipe-cards']);
    this.modalRef.hide();
  }
}
