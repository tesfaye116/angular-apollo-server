import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import {
  GET_POSTS,
  ADD_POST,
  UPDATE_POST,
  DELETE_POST,
  GET_USERS,
} from '../../graphql/graphql.queries';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  posts: any = [];
  users: any = [];
  isSuccess!: Boolean;

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.getAllPosts();

    this.apollo
      .watchQuery<any>({
        query: GET_USERS,
      })
      .valueChanges.subscribe((user) => {
        this.users = user.data.users;
      });
  }

  getAllPosts() {
    this.apollo
      .watchQuery<any>({
        query: GET_POSTS,
      })
      .valueChanges.subscribe((result) => {
        this.posts = result.data.posts;
        console.table(this.posts);
      });
  }

  //Reactive form
  postsForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
    published: new FormControl(false),
    author: new FormControl('', [Validators.required]),
  });

  addPost() {
    console.log('Hello Posts', this.postsForm.value.published);
    this.apollo
      .mutate({
        mutation: ADD_POST,
        variables: {
          title: this.postsForm.value.title,
          content: this.postsForm.value.content,
          published: this.postsForm.value.published,
          author: this.postsForm.value.author,
        },
        refetchQueries: [{ query: GET_POSTS }],
      })
      .subscribe(() => {
        this.isSuccess = true;
        this.postsForm.reset();
      });
  }

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    showToolbar: true,
    enableToolbar: true,
    placeholder: 'Enter your content .  . .',
    toolbarPosition: 'top',
    toolbarHiddenButtons: [['bold', 'italic'], ['fontSize']],
    height: '12rem',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' },
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: true,
  };
}
