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
import { MyAlbumComponent } from './components/my-album/my-album.component';
import { NewsDetailComponent } from './components/news-detail/news-detail.component';
import { AddMyAlbumComponent } from './components/add-my-album/add-my-album.component';
import { SubSubalbumComponent } from './components/sub-subalbum/sub-subalbum.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'fine-art', pathMatch: 'full'
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
    path: 'news-detail', component: NewsDetailComponent
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
    path: 'search-filters', component: SearchFiltersComponent, canActivate: [AuthGuard]
  },
  {
    path: 'all-tags', component: AllTagsComponent, canActivate: [AuthGuard]
  },
  {
    path: 'calender', component: CalenderComponent, canActivate: [AuthGuard]
  },
  {
    path: 'calender-preview', component: CalenderPreviewComponent, runGuardsAndResolvers: 'paramsOrQueryParamsChange', canActivate: [AuthGuard]
  },
  {
    path: 'random-photos', component: RandomPhotosComponent, canActivate: [AuthGuard]
  },
  {
    path: 'change-password', component: ChangePasswordComponent, canActivate: [AuthGuard]
  },
  {
    path: 'studio-album', component: StudioAlbumComponent, canActivate: [AuthGuard]
  },
  {
    path: 'sub-categories', component: SubCategoriesComponent, canActivate: [AuthGuard]
  },
  {
    path: 'sub-album', component: SubAlbumComponent, canActivate: [AuthGuard]
  },
  {
    path: 'sub-subcategories', component: SubSubalbumComponent, canActivate: [AuthGuard]
  },
  {
    path: 'my-album', component: MyAlbumComponent, canActivate: [AuthGuard]
  },
  {
    path: 'add-my-album', component: AddMyAlbumComponent, canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
