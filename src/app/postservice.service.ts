import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../config/config';


@Injectable({
  providedIn: 'root'
})
export class PostserviceService {

  constructor(private http: HttpClient) { }
  getAllPosts() {
    return this.http.get(config.URL + `/post/`)
  }
  getPostDetails(id: Number) {
    return this.http.get(config.URL + `/post/details/${id}`)
  }
  getReplyPostDetails(id: Number) {
    return this.http.get(config.URL + `/post/replypost/${id}`)
  }
  createQuestion(postDetails: any, username: String) {
    const data = {
      "posttitle": postDetails.title,
      "postcontent": postDetails.description,
      "tags": postDetails.tags.toString(),
      "username": username
    }
    return this.http.post(config.URL + `/post/`, data)

  }
  getAllPostsBasedOnUser(username: String) {
    return this.http.get(config.URL + `/post/${username}`)
  }
  getPostBasedOnTags(tag: String) {
    return this.http.get(config.URL + `/post/basedontags/${tag}`)
  }
  addComment(commentDetails: any, username: String, id: String) {
    const data = {
      "id": id,
      "username": username,
      "commentcontent": commentDetails.comment
    }
    return this.http.post(config.URL + `/post/comment`, data)
  }
  replyPost(postDetails: any, username: String, id: String) {
    const data = {
      "posttitle": postDetails.title,
      "postcontent": postDetails.description,
      "tags": postDetails.tags.toString(),
      "username": username,
      "quesId": id
    }
    return this.http.post(config.URL + `/post/replypost`, data)
  }
  vote(upvote: Number, downvote: Number, username: String, id: String) {
    const data = {

      "id": id,
      "upvote": upvote,
      "downvote": downvote,
      "username": username
    }
    return this.http.put(config.URL + `/post`, data)

  }
}
