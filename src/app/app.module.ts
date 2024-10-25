import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { FineArtComponent } from './components/fine-art/fine-art.component';
import { PhotoJournalismComponent } from './components/photo-journalism/photo-journalism.component';
import { ExhibitionsComponent } from './components/exhibitions/exhibitions.component';
import { NewsComponent } from './components/news/news.component';
import { ContactComponent } from './components/contact/contact.component';
import { ArchivesComponent } from './components/archives/archives.component';
import { HomeFullViewDetailComponent } from './components/home-full-view-detail/home-full-view-detail.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input-gg';
import { HttpClientModule } from '@angular/common/http';
import { SearchFiltersComponent } from './components/search-filters/search-filters.component';
import { AllTagsComponent } from './components/all-tags/all-tags.component';
import { CalenderComponent } from './components/calender/calender.component';
import { CalenderPreviewComponent } from './components/calender-preview/calender-preview.component';
import { RandomPhotosComponent } from './components/random-photos/random-photos.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { InnerHeaderComponent } from './components/inner-header/inner-header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { StudioAlbumComponent } from './components/studio-album/studio-album.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SubCategoriesComponent } from './components/sub-categories/sub-categories.component';
import { SubAlbumComponent } from './components/sub-album/sub-album.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LogInComponent,
    SignUpComponent,
    HomeComponent,
    FooterComponent,
    FineArtComponent,
    PhotoJournalismComponent,
    ExhibitionsComponent,
    NewsComponent,
    ContactComponent,
    ArchivesComponent,
    HomeFullViewDetailComponent,
    ForgetPasswordComponent,
    SearchFiltersComponent,
    AllTagsComponent,
    CalenderComponent,
    CalenderPreviewComponent,
    RandomPhotosComponent,
    ChangePasswordComponent,
    InnerHeaderComponent,
    SidebarComponent,
    StudioAlbumComponent,
    SubCategoriesComponent,
    SubAlbumComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxIntlTelInputModule,
    HttpClientModule,
    CarouselModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
