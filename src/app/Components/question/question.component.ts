import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { PostserviceService } from 'src/app/postservice.service';


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  questionForm: FormGroup;
  createQuestionSuccessMessageFlag: boolean = false;
  createQuestionFailureMessageFlag: boolean = false;
  constructor(private postService: PostserviceService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    if (!JSON.parse(localStorage.getItem('token'))) {
      window.location.href = "/login"
    }
    this.createForm()
  }
  createForm() {

    this.questionForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      tags: ['', Validators.required]
    });
  }

  save() {
    try {
      const username = JSON.parse(localStorage.getItem('username'))
      this.postService.createQuestion(this.questionForm.value, username).subscribe((res: any) => {
        this.createQuestionSuccessMessageFlag = true;
        window.location.reload();
      })
    }
    catch (e) {
      this.createQuestionFailureMessageFlag = true;
    }
  }
}

