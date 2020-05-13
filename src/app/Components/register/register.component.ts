import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray, NgForm } from '@angular/forms';
import { UserserviceService } from 'src/app/userservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  SuccessMessageFlag: boolean = false;
  FailureMessageFlag: boolean = false;
  constructor(private router: Router, private userService: UserserviceService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    localStorage.clear();
    this.createForm()
  }
  createForm() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required]
    });
  }

  register() {
    try {
      this.userService.register(this.registerForm.value).subscribe((res: any) => {
        this.SuccessMessageFlag = true
        //alert("Registered Successfully!")
        window.location.reload();
        // this.router.navigate(['/login'])
      })
    }
    catch (e) {
      this.FailureMessageFlag = true
      alert("Registration Failed!Try Again!")
    }
  }

}
