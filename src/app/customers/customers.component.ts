
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Customer } from '../model/customer.model';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers!:Observable<Array<Customer>>;

  erroMessage!:String;
  searchFormGroup: FormGroup| undefined;


  constructor(private customerService:CustomerService,private fb:FormBuilder) { }

  ngOnInit(): void {
    this.searchFormGroup=this.fb.group({
      keyword:this.fb.control("")
    });
//  this.customers=this.customerService.getCustomer().pipe(

//   catchError( err=>{
//     this.erroMessage=err.message;
//     return throwError(err);
//   }

//   )
//  )
this.handleSearchCustomers()
}
handleSearchCustomers(){
  let ks=this.searchFormGroup?.value.keyword;
  this.customers=this.customerService.searchCustomer(ks).pipe(
    catchError(err=>{
      this.erroMessage=err.message;
      return throwError(err);

    })
  );

}
deleteCustomer(c:Customer){
this.customerService.deleteCustomer(c.id).subscribe({

  next:data=>{
    this.customers=this.customers.pipe(
      map(data=>{
        let index=data.indexOf(c);
        data.slice(index,1)
        return data;
      })
    )
},error:err=>{
  console.log(err);
}
})
}



}
