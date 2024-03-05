import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {error} from "@angular/compiler-cli/src/transformers/util";

interface AuthResponseType {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string
}

@Injectable({providedIn: 'root'})
export class AuthService {

  constructor(private http: HttpClient) {
  }
  signup(email: string, password: string) {
    const payload = {
      email,
      password,
      returnSecureToken: true
    }
    const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA8TWSpVnbFjR1u4yISzIJ8OViaU_5pHic'
    return this.http.post<AuthResponseType>(url, payload).pipe(catchError((err, caught) => {
      const error = 'An unknown error occurred'
      // if(error.)
      return caught
    }))
  }

}
