import { Component, OnInit, Input } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {ContactDetails} from '../Models/ContactDetails';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
  private host="https://propsolsservices.azurewebsites.net/api/SaveContactDetails?code=UacMdSr4rQtaQtISrHgJmLA0DR9TMcs3aPBNqOI4vr7qu9Ghc66V7w==";
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  buttonDisabled: boolean = false;
  contactDetails : ContactDetails;
  closeResult: string;
  constructor(private modalService: NgbModal ,
    private http: HttpClient) 
    {
    this.contactDetails=new ContactDetails();
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',size: 'sm'}).result.then((result) => 
    {
      //alert("Name is :"+this.contactDetails.name+ "\nMobile is :"+ this.contactDetails.phoneNumber + "\nEmail is :"+ this.contactDetails.email);
      try {
            var httpresponseObject =  this.http.post<ContactDetails>(this.host, this.contactDetails, this.httpOptions).pipe(
          tap((obj: ContactDetails) =>this.log(obj.Name) ),
          catchError(this.handleError<ContactDetails>('addcontact'))
        ); 
        httpresponseObject.subscribe(result => {
          this.log(result.Id);
          alert("You have done your job, just relax, one of our executive will get in touch with you shortly");  
        });
        
      } catch (error) {
      alert(error);  
      }

      this.closeResult = `Closed with: ${result}`;
      this.contactDetails=new ContactDetails();
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.contactDetails=new ContactDetails();
    });
  }


  public  IsValdated():boolean
  {
    return this.contactDetails.Name == "";
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

    /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

    /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(message);
  }



  ngOnInit() {
  }

}
