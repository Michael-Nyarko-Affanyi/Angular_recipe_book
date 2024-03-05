import {Component, OnInit} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'appAuth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit{
  isLoading = false
  isLoginMode = true
  error = null

  constructor(private authService: AuthService) {}
  switchMode() {
    this.isLoginMode = !this.isLoginMode
  }

  handleSubmit(form: NgForm) {
    const {email, password} = form.value
    if(form.invalid) return
    if(this.isLoginMode) {

    } else {
      this.authService.signup(email, password).subscribe(
        (response => {
          console.log(response)
        }),
        (error) => {
          console.log(error)
        }
      )
    }
    form.reset()
}

  ngOnInit() {
  }
}
