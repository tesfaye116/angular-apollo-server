import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import {
  GET_POSTS,
  ADD_POST,
  UPDATE_POST,
  DELETE_POST,
} from '../../graphql/graphql.queries';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  posts: any = [];
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    placeholder: 'Enter text here...',
    height: '12rem',
    minHeight: '0',
    maxHeight: '12rem',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
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
    toolbarPosition: 'top',
    toolbarHiddenButtons: [['bold', 'italic'], ['fontSize']],
  };

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.getAllPosts();
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
    authorId: new FormControl('', [Validators.required]),
  });

  addPost() {
    this.apollo
      .mutate({
        mutation: ADD_POST,
        variables: {
          title: this.postsForm.value.title,
          content: this.postsForm.value.content,
          published: this.postsForm.value.published,
          authorId: this.postsForm.value.authorId,
        },
        refetchQueries: [{ query: GET_POSTS }],
      })
      .subscribe(({ data }: any) => {
        this.posts = data.createPosts;
        this.postsForm.reset();
        console.log(this.posts);
      });
  }
}
