import {Component, OnInit} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AuthResponseType, AuthService} from "../services/auth.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'appAuth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit{
  isLoading = false
  isLoginMode = true
  error = null

  constructor(private authService: AuthService, private router: Router) {}
  switchMode() {
    this.isLoginMode = !this.isLoginMode
  }

  handleSubmit(form: NgForm) {
    let authObservable: Observable<AuthResponseType>
    const {email, password} = form.value
    if(form.invalid) return
    if(this.isLoginMode) {
      authObservable = this.authService.login(email, password)
    } else {
      authObservable = this.authService.signup(email, password)
    }

    authObservable.subscribe(
      (response => {
        this.router.navigate(['/recipes'])
      }),
      (error) => {
        console.log(error)
        this.error = error
      }
    )

    form.reset()
}

  ngOnInit() {
  }
}
