import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {BehaviorSubject, throwError} from "rxjs";
import {User} from "./user.model";

export interface AuthResponseType {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean
}

@Injectable({providedIn: 'root'})
export class AuthService {
  user = new BehaviorSubject<User>(null)

  constructor(private http: HttpClient) {
  }

  private handleError = (err: HttpErrorResponse) => {
    let error = 'An unknown error occurred'
    if(err.error.error.message) {
      switch (err.error.error.message) {
        case 'EMAIL_EXISTS':
          error = 'Email already exist';
          break
        case 'INVALID_LOGIN_CREDENTIALS':
          error = 'Invalid username or password'
      }
    }
    return throwError(error)
  }

  private handleSaveUser = (responseUser: AuthResponseType) => {
    // console.log("user:::", this.user)
    // console.log("From tap:::", user)
    const user = new User(responseUser.localId, responseUser.email, responseUser.idToken, responseUser.expiresIn)
    this.user.next(user)
  }

  signup(email: string, password: string) {
    const payload = {
      email,
      password,
      returnSecureToken: true
    }
    const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA8TWSpVnbFjR1u4yISzIJ8OViaU_5pHic'
    return this.http.post<AuthResponseType>(url, payload).pipe(catchError(this.handleError), tap(this.handleSaveUser))
  }

  login(email: string, password: string) {
    const payload = {
      email, password,
      returnSecureToken: true
    }
    return this.http
      .post<AuthResponseType>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA8TWSpVnbFjR1u4yISzIJ8OViaU_5pHic', payload)
      .pipe(catchError(this.handleError), tap(this.handleSaveUser))
  }

}
