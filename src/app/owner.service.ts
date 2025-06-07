import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {
  API="http://localhost:8080";
  public registerOwner(ownerData: any)
  {
    return this.http.post(`${this.API}/ownerservice` , ownerData);
  }

  public getOwners(){
    return this.http.get(`${this.API}/ownerservice`);
  }

  public deleteOwner(ownerId:any){
    return this.http.delete(`${this.API}/ownerservice/${ownerId}`);
  }

  public updateOwner(owner: any){
    return this.http.put(`${this.API}/ownerservice/${owner.ownerid}`, owner);
  }
  constructor(private http: HttpClient) { }
}
