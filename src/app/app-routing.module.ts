import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';   
import { ShareLocationComponent } from './share-location/share-location.component';
import { SwipeCardsComponent } from './swipe-cards/swipe-cards.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { DailyLimitComponent } from './daily-limit/daily-limit.component';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { ChatComponentComponent } from './chat-component/chat-component.component';
import { ProfileComponent } from './profile/profile.component';
import { SetupProfileComponent } from './setup-profile/setup-profile.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
    {
    path: 'share-location',
    component: ShareLocationComponent
  },
      {
    path: 'swipe-cards',
    component: SwipeCardsComponent
  },
        {
    path: 'edit-profile',
    component: EditProfileComponent
  },
          {
    path: 'daily-limit',
    component: DailyLimitComponent
  },
            {
    path: 'chatbox',
    component: ChatBoxComponent
  },
              {
    path: 'chat',
    component: ChatComponentComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'setup-profile',
    component: SetupProfileComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingcomponent = [ HomeComponent,
                                  ShareLocationComponent,
                                  SwipeCardsComponent,
                                  EditProfileComponent,
                                  DailyLimitComponent,
                                  ChatBoxComponent,
                                  ChatComponentComponent,
                                  ProfileComponent,
                                  SetupProfileComponent
                                ];