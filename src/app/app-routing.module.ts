import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';
import { HomeComponent } from './components/home/home.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { FineArtComponent } from './components/fine-art/fine-art.component';
import { PhotoJournalismComponent } from './components/photo-journalism/photo-journalism.component';
import { ExhibitionsComponent } from './components/exhibitions/exhibitions.component';
import { NewsComponent } from './components/news/news.component';
import { ArchivesComponent } from './components/archives/archives.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeFullViewDetailComponent } from './components/home-full-view-detail/home-full-view-detail.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { AuthGuard } from './guards/auth.guard';
import { SearchFiltersComponent } from './components/search-filters/search-filters.component';
import { AllTagsComponent } from './components/all-tags/all-tags.component';
import { CalenderComponent } from './components/calender/calender.component';
import { CalenderPreviewComponent } from './components/calender-preview/calender-preview.component';
import { RandomPhotosComponent } from './components/random-photos/random-photos.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { StudioAlbumComponent } from './components/studio-album/studio-album.component';
import { SubCategoriesComponent } from './components/sub-categories/sub-categories.component';
import { SubAlbumComponent } from './components/sub-album/sub-album.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'log-in', component: LogInComponent
  },
  {
    path: 'forget-password', component: ForgetPasswordComponent
  },
  {
    path: 'sign-up', component: SignUpComponent
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'fine-art', component: FineArtComponent
  },
  {
    path: 'photo-journalism', component: PhotoJournalismComponent
  },
  {
    path: 'exhibition', component: ExhibitionsComponent
  },
  {
    path: 'news', component: NewsComponent
  },
  {
    path: 'contact', component: ContactComponent
  },
  {
    path: 'archives', component: ArchivesComponent, canActivate: [AuthGuard]
  },
  {
    path: 'home-full-view-detail', component: HomeFullViewDetailComponent
  },
  {
    path: 'search-filters', component: SearchFiltersComponent
  },
  {
    path: 'all-tags', component: AllTagsComponent
  },
  {
    path: 'calender', component: CalenderComponent
  },
  {
    path: 'calender-preview', component: CalenderPreviewComponent
  },
  {
    path: 'random-photos', component: RandomPhotosComponent
  },
  {
    path: 'change-password', component: ChangePasswordComponent
  },
  {
    path: 'studio-album', component: StudioAlbumComponent
  },
  {
    path: 'sub-categories', component: SubCategoriesComponent
  },
  {
    path: 'sub-album', component: SubAlbumComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
