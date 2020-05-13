import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray, NgForm } from '@angular/forms';
import { UserserviceService } from 'src/app/userservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private router: Router, private userService: UserserviceService, private formBuilder: FormBuilder) { }
  invalidFlag: Boolean = false
  ngOnInit(): void {
    localStorage.clear();
    this.createForm()
  }
  createForm() {
    this.loginForm = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    try {
      this.userService.login(this.loginForm.value).subscribe((res: any) => {
        const token = res.jwttoken;
        const username = res.username
        const score = res.score
        const role = res.role
        localStorage.setItem('token', JSON.stringify(token));
        localStorage.setItem('username', JSON.stringify(username));
        localStorage.setItem('score', JSON.stringify(score));
        localStorage.setItem('role', JSON.stringify(role));
        this.router.navigate(['/questions'])
      })
    }
    catch (e) {
      this.invalidFlag = true
    }
  }


}
