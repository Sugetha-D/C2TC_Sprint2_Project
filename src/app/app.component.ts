import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OwnerService } from './owner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'owner-module';

  constructor(private ownerService: OwnerService) {
    this.getOwnerDetails();
  }

  register(registerForm: NgForm) {
    this.ownerService.registerOwner(registerForm.value).subscribe(
      (resp: any) => {
        console.log(resp);
        registerForm.reset();
        this.getOwnerDetails();
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  getOwnerDetails() {
    this.ownerService.getOwners().subscribe(
      (resp) => {
        console.log(resp);
        this.ownerDetails = resp;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ownerDetails = null as any;

  deleteOwner(owner: any) {
    this.ownerService.deleteOwner(owner.ownerid).subscribe(
      (resp) => {
        console.log(resp);
        this.getOwnerDetails();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ownerToUpdate = {
    ownerid: null as any,
    ownername: "",
    address: ""
  };

  edit(owner: any) {
    this.ownerToUpdate = { ...owner };
  }

  updateOwner() {
    this.ownerService.updateOwner(this.ownerToUpdate).subscribe(
      (resp) => {
        console.log(resp);
        this.getOwnerDetails();
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
