import { Component, OnInit } from '@angular/core';
import { PostserviceService } from 'src/app/postservice.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: Array<any> = []
  tag: String
  loadFlag: Boolean = true;
  constructor(private postService: PostserviceService, private router: Router, private activatedRouter: ActivatedRoute) {

  }

  ngOnInit(): void {
    if (!JSON.parse(localStorage.getItem('token'))) {
      window.location.href = "/login"
    }
    this.activatedRouter.queryParams.subscribe((params) => {
      if (params.tagValue) {
        this.getPostBasedOnTags()
      } else {
        this.getAllPosts()
      }
    })
  }

  getPostBasedOnTags() {
    const tagQuery = this.activatedRouter.snapshot.queryParamMap.get("tagValue")

    this.postService.getPostBasedOnTags(tagQuery).subscribe((res: any) => {
      this.posts = res.message
    })
  }

  getAllPosts() {
    this.postService.getAllPosts().subscribe((res: any) => {
      this.posts = res.message
    })
  }
  askQues() {
    window.location.href = "/questions/ask"
  }
}
