/// https://github.com/quilljs
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss']
})
export class TextEditorComponent implements OnInit {

  editorForm: FormGroup;

  blured = false;
  focused = false;

  editorStyle = {
    height: '200px'
  };
  config = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],

      [{ header: 1 }, { header: 2 }],               // custom button values
      [{ list: 'ordered'}, { list: 'bullet' }],
      [{ script: 'sub'}, { script: 'super' }],      // superscript/subscript
      [{ indent: '-1'}, { indent: '+1' }],          // outdent/indent
      [{ direction: 'rtl' }],                         // text direction

      [{ size: ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }],          // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],

      ['clean'],                                         // remove formatting button
      ['link', 'image']
    ]
  };

  constructor(private fb: FormBuilder) {

  }
  onSubmit() {

  }

  ngOnInit() {
    this.buildEditorForm();
  }

  buildEditorForm() {
    this.editorForm  = this.fb.group({
      editor: [null]
    });
  }

  created(event) {
    console.log('editor-created', event);
  }

  changedEditor(event) {
    console.log('editor-change', event);
  }

  focus(event) {
    console.log('focus', event);
    this.focused = true;
    this.blured = false;
  }

  blur(event) {
    console.log('blur', event);
    this.focused = false;
    this.blured = true;
  }
}
