import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {BehaviorSubject, throwError} from "rxjs";
import {User} from "./user.model";
import {Router} from "@angular/router";

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
  expirationTimer: any

  constructor(private http: HttpClient, private router: Router) {
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
    localStorage.setItem('user', JSON.stringify(user))
    this.user.next(user)
    this.autoLogout(+responseUser.expiresIn)
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
  logout() {
    this.user.next(null)
    this.router.navigate(['/auth'])
    localStorage.removeItem('user')
    clearTimeout(this.expirationTimer)
  }

  autoLogin() {
    const loggedInUser: {id: string, email: string, _token: string, _tokenLifespan: string} = JSON.parse(localStorage.getItem('user'))

    if (!loggedInUser) {
      return this.router.navigate(['/auth'])
    }

    const user = new User(loggedInUser.id, loggedInUser.email, loggedInUser._token, loggedInUser._tokenLifespan)

    if (user.token) {
      const expirationDuration = new Date(loggedInUser._tokenLifespan).getTime() - new Date().getTime()
      this.user.next(user)
      this.autoLogout(expirationDuration)
      // this.router.navigate(['/recipes'])
    }

  }

  autoLogout(expirationDuration: number) {
    this.expirationTimer = setTimeout(() => {
      this.logout()
    }, expirationDuration)
  }

}
