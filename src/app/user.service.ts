import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { catchError, tap } from 'rxjs/operators';

  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl = 'http://localhost:8080/booking/users';
  
  constructor(private http: HttpClient, 
    private messageService: MessageService) { }

  getusers(): Observable<User[]> {    
    return this.http.get<User[]>(this.usersUrl).pipe(
      catchError(this.handleError('getHeroes', []))
    );
  }
  
  getuser(id: number): Observable<User> {
    const url = `${this.usersUrl}/${id}`;
    // TODO: send the message _after_ fetching the user    
    return this.http.get<User>(url).pipe(
      tap(_ => this.log(`get user id=${id}`)),
      catchError(this.handleError<User>(`getUser id=${id}`)));
  }
  
  /** PUT: update the hero on the server */
  updateUser (user: User): Observable<any> {
  return this.http.put(this.usersUrl, user, httpOptions).pipe(
    tap(_ => this.log(`updated hero id=${user.id}`)),
    catchError(this.handleError<any>('updateHero'))
  );
}
  
  addUser (user: User) : Observable<any> {
      return this.http.post<User>(this.usersUrl,user,httpOptions).pipe(
              tap(_ => this.log(`added user id=${user.id}`)),
              catchError(this.handleError<any>('addUser'))      
      );
  }
  
  deleteUser (user) : Observable<any> {
      const id = typeof user === 'number' ? user : user.id;
      const url = `${this.usersUrl}/${id}`;
      return this.http.delete<User>(url,httpOptions).pipe(
              tap(_ => this.log(`deleted user id=${user.id}`)),
              catchError(this.handleError<any>('deleteUser'))      
      );
   
  }
  
  /** Log a userService message with the MessageService */
  private log(message: string) {
   this.messageService.add(`userService: ${message}`);
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
}

