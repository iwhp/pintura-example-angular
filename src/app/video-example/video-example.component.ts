import { Component, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PinturaEditorComponent } from '@pqina/angular-pintura';
import * as Mp4Muxer from 'mp4-muxer';

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

import {
  createDefaultVideoWriter,
  createMediaStreamEncoder,
  createMuxerEncoder,
  plugin_trim,
  plugin_trim_locale_en_gb,
} from '@pqina/pintura-video';

// Third-party library used to fix MediaRecorder bug on Chrome
// https://pqina.nl/pintura/docs/v8/api/video-editor/exports/#createmediastreamencoder
// https://bugs.chromium.org/p/chromium/issues/detail?id=642012
import fixWebmDuration from 'webm-duration-fix';

// Add video trim plugin (uncomment to add video support)
setPlugins(plugin_trim);

@Component({
  selector: 'app-video-example',
  templateUrl: './video-example.component.html',
  styleUrls: ['./video-example.component.css'],
  standalone: false,
})
export class VideoExampleComponent {
  @ViewChild('editorRef') editorRef?: PinturaEditorComponent<any> = undefined;

  constructor(private sanitizer: DomSanitizer) {}

  editorOptions = getEditorDefaults({
    // set trim util position in list of utils
    utils: ['crop', 'trim', 'filter', 'finetune', 'annotate'],

    // add media writer (uncomment to add video support)
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

        // Use muxer to encode videos
        createDefaultVideoWriter({
          encoder: createMuxerEncoder({
            // when using the mp4 muxer we need to set video/mp4 mimetype
            muxer: Mp4Muxer,
            mimeType: 'video/mp4',

            // video and audio bitrate to use (optional)
            // videoBitrate: 2500000, // 2.5MBps
            // audioBitrate: 192000, // 192KBps, should be either (96000, 128000, 160000, or 192000)
            // audioSampleRate: undefined, // will default to output device supported sample rate, 441000 is a common value to use instead

            // this draws the image
            imageStateToCanvas,

            // enable logging
            log: true,
          }),
        }),

        // Fallback to mediastream encoder
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

    // add trim locale (uncomment to add video support)
    locale: {
      ...plugin_trim_locale_en_gb,
    },
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

  async handleProcessError($event: any) {
    console.log('process error', $event);
  }

  async handleProcess($event: any) {
    console.log('process', $event);

    // no output created, make sure mediawriter is set
    if (!$event.dest) return;

    let dest = $event.dest;
    if (/video/.test($event.dest.type)) {
      this.resultType = 'video';
    } else {
      this.resultType = 'image';
    }

    const objectURL = URL.createObjectURL(dest);
    this.result = this.sanitizer.bypassSecurityTrustResourceUrl(
      objectURL
    ) as string;
  }
}
