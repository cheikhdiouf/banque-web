import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer } from '../model/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
 

  constructor(private http:HttpClient) { }


  public getCustomer():Observable<Array<Customer>>{
    return this.http.get<Array<Customer>>(environment.ApiUrl+"customers");
     
  }
  public searchCustomer( keyword:String):Observable<Array<Customer>>{
    return this.http.get<Array<Customer>>(environment.ApiUrl+"customers/search?keyword=" +keyword);
     
  }

  public savedCustomer(customer:Customer):Observable<Customer>{
    return this.http.post<Customer>(environment.ApiUrl+"customers",customer);
     
  }


public deleteCustomer(id:number){
  return this.http.delete(environment.ApiUrl+"customers/"+id)
}


}
