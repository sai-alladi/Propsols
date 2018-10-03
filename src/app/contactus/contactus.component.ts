import { Component, OnInit, Input } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {ContactDetails} from '../Models/ContactDetails';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
  
  buttonDisabled: boolean = true;
  contactDetails : ContactDetails;
  closeResult: string;
  constructor(private modalService: NgbModal) {
    this.contactDetails=new ContactDetails();
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',size: 'sm'}).result.then((result) => 
    {
      alert("Name is :"+this.contactDetails.name+ "\nMobile is :"+ this.contactDetails.phoneNumber + "\nEmail is :"+ this.contactDetails.email);
      this.closeResult = `Closed with: ${result}`;
      this.contactDetails=new ContactDetails();
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.contactDetails=new ContactDetails();
    });
  }

  public  IsValdated():boolean
  {
    return true;
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  ngOnInit() {
  }

}
