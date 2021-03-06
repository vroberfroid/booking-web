import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { UserService }  from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  @Input() user: User;
  
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getuser();
  }
  
  getuser(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.getuser(id)
      .subscribe(user => this.user = user);
}
  
  goBack(): void {
    this.location.back();
}
  save(): void {
   this.userService.updateUser(this.user)
     .subscribe(() => this.goBack());
 }
}
