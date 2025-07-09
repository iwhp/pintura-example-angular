import { Component, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PinturaEditorComponent } from '@pqina/angular-pintura';

import {
  PinturaEditorOptions,
  createDefaultImageWriter,
  createDefaultMediaWriter,
  getEditorDefaults,
  imageStateToCanvas,
  setPlugins,
} from '@pqina/pintura';

// Import Pintura video extension modules (uncomment to add video support)
// Make sure to add "./node_modules/@pqina/pintura-video/pinturavideo.css" to angular.json build styles
/*
import {
  createDefaultVideoWriter,
  createMediaStreamEncoder,
  plugin_trim,
  plugin_trim_locale_en_gb,
} from '@pqina/pintura-video';
*/

// Third-party library used to fix MediaRecorder bug on Chrome
// https://pqina.nl/pintura/docs/v8/api/video-editor/exports/#createmediastreamencoder
// https://bugs.chromium.org/p/chromium/issues/detail?id=642012
import fixWebmDuration from 'webm-duration-fix';

// Add video trim plugin (uncomment to add video support)
/*
setPlugins(plugin_trim);
*/

@Component({
    selector: 'app-video-example',
    templateUrl: './video-example.component.html',
    styleUrls: ['./video-example.component.css'],
    standalone: false
})
export class VideoExampleComponent {
  @ViewChild('editorRef') editorRef?: PinturaEditorComponent<any> = undefined;

  constructor(private sanitizer: DomSanitizer) {}

  editorOptions = getEditorDefaults({
    // set trim util position in list of utils
    utils: ['crop', 'trim', 'filter', 'finetune', 'annotate'],

    // add media writer (uncomment to add video support)
    /*
    imageWriter: createDefaultMediaWriter(
      // Generic Media Writer options, passed to image and video writer
      {
        targetSize: {
          width: 400,
        },
      },
      [
        // For handling images
        createDefaultImageWriter(),

        // For handling videos
        createDefaultVideoWriter({
          // Video writer instructions here
          // ...
          // Encoder to use
          encoder: createMediaStreamEncoder({
            imageStateToCanvas,
          }),
        }),
      ]
    ),
    */

    // add trim locale (uncomment to add video support)
    /*
    locale: {
      ...plugin_trim_locale_en_gb,
    },
    */
  }) as PinturaEditorOptions;

  src: string = 'assets/video.mp4';
  result?: string = undefined;
  resultType?: 'video' | 'image' = undefined;
  cropAspectRatio = 1;

  handleLoad($event: any) {
    console.log('load', $event);

    console.log('component ref', this.editorRef);

    console.log('editor instance ref', this.editorRef?.editor);

    console.log('image state', this.editorRef?.editor?.imageState);
  }

  async handleProcess($event: any) {
    console.log('process', $event);

    // no output created, make sure mediawriter is set
    if (!$event.dest) return;

    let dest;
    if (/video/.test($event.dest.type)) {
      dest = await fixWebmDuration($event.dest);
      this.resultType = 'video';
    } else {
      dest = $event.dest;
      this.resultType = 'image';
    }

    const objectURL = URL.createObjectURL(dest);
    this.result = this.sanitizer.bypassSecurityTrustResourceUrl(
      objectURL
    ) as string;
  }
}
