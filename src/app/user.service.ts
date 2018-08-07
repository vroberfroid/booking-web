import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user';
import { users } from './mock-users';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
@Injectable({
  providedIn: 'root'
})
export class UserService {


  private usersUrl = 'http://localhost:8080/users';
  
  constructor(private http: HttpClient, 
    private messageService: MessageService) { }
  getusers(): Observable<User[]> {    
    return this.http.get<User[]>(this.usersUrl);
  }
  
  getuser(id: number): Observable<User> {
    // TODO: send the message _after_ fetching the user    
    return this.http.get<User>(this.usersUrl + '/0');
  }
  
  /** Log a userService message with the MessageService */
  private log(message: string) {
   this.messageService.add(`userService: ${message}`);
  }
}

