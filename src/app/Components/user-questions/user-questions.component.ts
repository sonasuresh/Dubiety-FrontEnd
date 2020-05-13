import { Component, OnInit } from '@angular/core';
import { PostserviceService } from 'src/app/postservice.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-questions',
  templateUrl: './user-questions.component.html',
  styleUrls: ['./user-questions.component.css']
})
export class UserQuestionsComponent implements OnInit {
  posts: Array<any> = []
  username: String
  noPostFlag: Boolean = false
  constructor(private postService: PostserviceService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    if (!JSON.parse(localStorage.getItem('token'))) {
      window.location.href = "/login"
    }
    this.username = this.activatedRoute.snapshot.params['username']
    this.getAllPosts()

  }
  getAllPosts() {

    this.postService.getAllPostsBasedOnUser(this.username).subscribe((res: any) => {
      if (res != null) {
        this.posts = res.message
      }
      else {
        this.noPostFlag = true
      }
    })
  }
}
