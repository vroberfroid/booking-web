import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import {TableModule} from 'primeng/table';
import {LazyLoadEvent} from "primeng/api";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[];

  rowsPerPage: number = 10;
  pageable: boolean = true;

  public primeNgColumns: any[] = [];
  
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getusers();
    this.primeNgColumns = [
      { field:'id', header:'Id'},
      { field:'firstName', header:'First Name'},
      { field:'name', header:'Last Name'}
    ];
  }

  loadData(event: LazyLoadEvent) {

  }

  getusers(): void {
    this.userService.getusers()
      .subscribe(users => this.users = users);
  }
  
  add(name: string, firstName: string): void {
      name = name.trim();
      firstName = firstName.trim();
      if (!name) { return; }
      this.userService.addUser({ name, firstName } as User)
        .subscribe(user => {
          this.users.push(user);
        });
    }
  
  delete(user: User): void {
      this.users = this.users.filter(h => h !== user);
      this.userService.deleteUser(user).subscribe();
    }
}
