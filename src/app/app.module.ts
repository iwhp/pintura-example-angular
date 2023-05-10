import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { AngularPinturaModule } from '@pqina/angular-pintura';

import { FilePondModule, registerPlugin } from 'ngx-filepond';
import * as FilePondPluginFilePoster from 'filepond-plugin-file-poster';
import * as FilePondPluginImageEditor from '@pqina/filepond-plugin-image-editor';

// @ts-ignore
registerPlugin(FilePondPluginFilePoster, FilePondPluginImageEditor.default);

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AngularPinturaModule, FilePondModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
