import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Pet } from '../pet/pet';
import { User } from '../user/user';
import { Observable }   from 'rxjs/Observable';
import '../rxjs-operators/rxjs-operators';

@Injectable()
export class PetService {

	constructor(private http: Http) { }

	getPets() : Observable<Pet[]>{
    	return this.http.get(`http://localhost:2000/pets`)
                  .map(res => res.json())
                  .catch(this.handleError);
	}

	addPet(pet: Pet): Observable<Pet[]>  {
	    let body = JSON.stringify( pet );
    	let headers = new Headers({ 'Content-Type': 'application/json' });
    	let options = new RequestOptions({ headers: headers });
    	console.log(body);
   		return this.http.put('http://localhost:2000/addpet', body, options)
                    .map(res => res)
                    .catch(this.handleError);
	}

	saveChanges(pet: Pet, oldPet: Pet): Observable<Pet[]>  {
	    let body = JSON.stringify( { pet, oldPet} );
    	let headers = new Headers({ 'Content-Type': 'application/json' });
    	let options = new RequestOptions({ headers: headers });
    	console.log(body);
   		return this.http.put(`http://localhost:2000/editpet`, body, options)
                    .map(res => res)
                    .catch(this.handleError);
	}

	delete(pet): Observable<Pet[]>  {
	    let body = JSON.stringify( pet);
    	let headers = new Headers({ 'Content-Type': 'application/json' });
    	let options = new RequestOptions({ headers: headers });

   		return this.http.put(`http://localhost:2000/deletepets`, body, options)
                    .map(res => res)
                    .catch(this.handleError);
	}

	addUser(user: User): Observable<string>  {
	    let body = JSON.stringify( user );
    	let headers = new Headers({ 'Content-Type': 'application/json' });
    	let options = new RequestOptions({ headers: headers });
   		return this.http.post('http://localhost:2000/signup', body, options)
                    .map(res => res.json().msg)
                    .catch(this.handleError);
	}

	login(user: User): Observable<string> {
		let body = JSON.stringify( user );
    	let headers = new Headers({ 'Content-Type': 'application/json' });
    	let options = new RequestOptions({ headers: headers });

    	return this.http.post('http://localhost:2000/login', body, options)
                    .map(res => res.json().msg)
                    .catch(this.handleError);
	}

	changePassword(user: User): Observable<string>  {
	    let body = JSON.stringify( user);
    	let headers = new Headers({ 'Content-Type': 'application/json' });
    	let options = new RequestOptions({ headers: headers });
    	console.log(body);
   		return this.http.put(`http://localhost:2000/password`, body, options)
                    .map(res => res)
                    .catch(this.handleError);
	}

	logout() {
		return this.http.get(`http://localhost:2000/logout`)
                  .map(res => res.json())
                  .catch(this.handleError);
	}

	private extractData(res: Response) {
	    let body = res.json();
	   	return body.msg || { };
	}

	private handleError (error: any) {
	    // In a real world app, we might use a remote logging infrastructure
	    // We'd also dig deeper into the error to get a better message
	    let errMsg = (error.message) ? error.message :
	      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
	    console.error(errMsg); // log to console instead
	    return Observable.throw(errMsg);
	}
	 
}
