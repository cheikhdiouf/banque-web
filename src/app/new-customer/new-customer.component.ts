import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Customer } from '../model/customer.model';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit {

  newCustomerFormGroup!:FormGroup;

  constructor(private customerService:CustomerService,private fb:FormBuilder) { }

  ngOnInit(): void {
  
    this.newCustomerFormGroup=this.fb.group({
      name:this.fb.control("",[Validators.required,Validators.minLength(4)]),
      email:this.fb.control("",[Validators.email,Validators.required]),
    })
  }


  HandleSaveCustome(){
    let customer:Customer=this.newCustomerFormGroup!.value
    this.customerService.savedCustomer(customer).subscribe({
      next:data=>{
        alert("validation de l'enregistrement")
        console.log(data)
      },
      error:err=>{
        console.log(err);
      }
    })
  }
}
