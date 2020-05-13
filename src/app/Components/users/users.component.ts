import { Component, OnInit } from '@angular/core';
import { UserserviceService } from 'src/app/userservice.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray, NgForm } from '@angular/forms';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: Array<any> = []
  currentUserName: String
  currentUserScore: Number
  SuccessMessageFlag: boolean = false;
  FailureMessageFlag: boolean = false;
  userForm: FormGroup;
  SuccesspermissionFlag: boolean = false
  constructor(private userService: UserserviceService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    if (!JSON.parse(localStorage.getItem('token'))) {
      window.location.href = "/login"
    }
    const role = JSON.parse(localStorage.getItem('role'))
    if (role == 'ADMIN') {
      this.SuccesspermissionFlag = true
    }
    this.createQuestionForm()

    this.getUserDetails()
  }
  createQuestionForm() {
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required]

    });
  }
  getUserDetails() {
    this.userService.getUsers().subscribe((res: any) => {
      this.users = res.message
    })
  }
  getCurrentUserDetails(id: String) {
    for (var i = 0; i < this.users.length; i++) {
      if (this.users[i]._id == id) {
        this.currentUserName = this.users[i].username
        this.currentUserScore = this.users[i].score
      }
    }
  }
  updateScore() {
    try {
      this.userService.updateScore(this.currentUserName, this.currentUserScore).subscribe((res: any) => {
        this.SuccessMessageFlag = true
        window.location.reload()
      })
    }
    catch (error) {
      this.FailureMessageFlag = true
    }

  }
  addAdmin() {
    try {
      this.userService.addUser(this.userForm.value).subscribe((res: any) => {
        this.SuccessMessageFlag = true
        window.location.reload()
      })
    }
    catch (error) {
      this.FailureMessageFlag = true
    }

  }
}
