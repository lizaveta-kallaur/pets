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

	getPets(email: string) {
    	return this.http.get(`http://localhost:2000/${email}`)
                  .map(this.extractData)
                  .catch(this.handleError);
	}

	addPet(email: string, pet: Pet): Observable<Pet>  {
	    let body = JSON.stringify( pet );
    	let headers = new Headers({ 'Content-Type': 'application/json' });
    	let options = new RequestOptions({ headers: headers });
   		return this.http.post('http://localhost:2000/${email}/addpet', body, options)
                    .map(this.extractData)
                    .catch(this.handleError);
	}

	save(user: User): Observable<User>  {
	    let body = JSON.stringify( user );
    	let headers = new Headers({ 'Content-Type': 'application/json' });
    	let options = new RequestOptions({ headers: headers });
   		return this.http.post('http://localhost:2000/signup', body, options)
                    .map(this.extractData)
                    .catch(this.handleError);
	}

	login(user: User): Observable<User> {
		let body = JSON.stringify( user );
    	let headers = new Headers({ 'Content-Type': 'application/json' });
    	let options = new RequestOptions({ headers: headers });

    	return this.http.post('http://localhost:2000/login', body, options)
                    .map(this.extractData)
                    .catch(this.handleError);
	}

	 private extractData(res: Response) {
	    let body = res.json();
	    console.log(body);
	    return body.data || { };
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
