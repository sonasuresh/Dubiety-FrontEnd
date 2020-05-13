import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray, NgForm } from '@angular/forms';
import { PostserviceService } from 'src/app/postservice.service';


@Component({
  selector: 'app-questiondetails',
  templateUrl: './questiondetails.component.html',
  styleUrls: ['./questiondetails.component.css']
})
export class QuestiondetailsComponent implements OnInit {
  postId: Number
  votes: any = 0
  Postupvotes: Number = 0
  Postdownvotes: Number = 0
  replyPostupvotes: Number = 0
  replyPostdownvotes: Number = 0
  postDetails: Array<any> = []
  replyPostDetails: Array<any> = []
  postComments: Array<any> = []
  postVotes: Array<any> = []
  replyPostVotes: Number = 0
  replyPosts: Array<any> = []
  replyPostsComments: Array<any> = []
  answersLength: Number = 0
  commentsFlagValues: Array<Number> = []
  commentForm: FormGroup;
  currentPostId: String
  createCommentSuccessMessageFlag: boolean = false;
  createCommentFailureMessageFlag: boolean = false;
  questionForm: FormGroup;
  createQuestionSuccessMessageFlag: boolean = false;
  createQuestionFailureMessageFlag: boolean = false;
  voteSuccessFlag: boolean = false
  voteFailureFlag: boolean = false
  SuccesspermissionFlag: boolean = false
  failurePermissionFlag: boolean = false
  constructor(private postService: PostserviceService, private router: Router, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    if (!JSON.parse(localStorage.getItem('token'))) {
      window.location.href = "/login"
    }
    if (JSON.parse(localStorage.getItem('score')) > 10) {
      this.SuccesspermissionFlag = true
    }
    else {
      this.failurePermissionFlag = true
    }

    this.createQuestionForm()
    this.createForm()
    this.postId = this.activatedRoute.snapshot.params['id']
    this.getpostDetails();
    this.getReplyPostDetails();
  }
  createForm() {

    this.commentForm = this.formBuilder.group({
      comment: ['', Validators.required]
    });

  }
  createQuestionForm() {
    this.questionForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      tags: ['', Validators.required]
    });
  }
  getpostDetails() {

    this.postService.getPostDetails(this.postId).subscribe((res: any) => {
      this.postDetails = res.message
      this.postComments = this.postDetails[0].comments
      this.postVotes = this.postDetails[0].votes
      this.Postupvotes = 0;
      this.Postdownvotes = 0
      for (var i = 0; i < this.postVotes.length; i++) {
        this.Postupvotes += this.postVotes[i].upvote
        this.Postdownvotes += this.postVotes[i].downvote
      }
      this.Postupvotes = Number(this.Postupvotes) - Number(this.Postdownvotes)

    })
  }
  getReplyPostDetails() {
    this.postService.getReplyPostDetails(this.postId).subscribe((res: any) => {
      this.replyPosts = res.message;
      this.answersLength = this.replyPosts.length

    })
  }
  getCurrentPostId(id: String) {

    this.currentPostId = id;
  }
  askQues() {
    window.location.href = "/questions/ask"
  }
  saveComment() {
    try {

      this.postService.addComment(this.commentForm.value, JSON.parse(localStorage.getItem('username')), this.currentPostId).subscribe((res: any) => {
        this.createCommentSuccessMessageFlag = true
        this.getpostDetails();
        this.getReplyPostDetails();
      })
    }
    catch (error) {
      this.createCommentFailureMessageFlag = true
    }
  }
  saveReply() {
    try {
      this.postService.replyPost(this.questionForm.value, JSON.parse(localStorage.getItem('username')), this.currentPostId).subscribe((res: any) => {
        this.createQuestionSuccessMessageFlag = true
        this.getpostDetails();
        this.getReplyPostDetails();
      })
    }
    catch (error) {
      this.createQuestionFailureMessageFlag = true
    }
  }
  incUpvote(id: String) {
    try {

      const upvote = 1
      const downvote = 0
      this.postService.vote(upvote, downvote, JSON.parse(localStorage.getItem('username')), id).subscribe((res: any) => {
        this.voteSuccessFlag = true
        this.getpostDetails();
        this.getReplyPostDetails();
      })
    } catch (error) {
      this.voteFailureFlag = true

    }
  }
  incDownvote(id: String) {
    try {
      const upvote = 0
      const downvote = 1
      this.postService.vote(upvote, downvote, JSON.parse(localStorage.getItem('username')), id).subscribe((res: any) => {
        this.voteSuccessFlag = true
        this.getpostDetails();
        this.getReplyPostDetails();
      })
    } catch (error) {

      this.voteFailureFlag = true


    }
  }
  calculate(votes: any) {
    this.replyPostupvotes = 0;
    this.replyPostdownvotes = 0
    for (var i = 0; i < votes.length; i++) {

      this.replyPostupvotes += votes[i].upvote
      this.replyPostdownvotes += votes[i].downvote
    }
    this.replyPostVotes = Number(this.replyPostupvotes) - Number(this.replyPostdownvotes)
    return (this.replyPostVotes)


  }
}
