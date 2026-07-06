import { Routes } from '@angular/router';
import { Privacy } from './Profile/privacy/privacy';
import { Security } from './Profile/security/security';
import { Profile } from './Profile/profile/profile';
import { ContactSupport } from './Profile/contact-support/contact-support/contact-support';
import { MyDesignsComponent } from './components/my-designs/my-designs.component/my-designs.component';
import { PublishLayoutComponent } from './components/my-designs/publish/publish-layout.component/publish-layout.component';
import { PuplishDesignComponent } from './components/my-designs/publish/puplish-design.component/puplish-design.component';
import { StepReviewComponent } from './components/my-designs/publish/step-review.component/step-review.component';
import { StepSizesQuantityComponent } from './components/my-designs/publish/step-sizes-quantity.component/step-sizes-quantity.component';
import { StepColorsMaterialsComponent } from './components/my-designs/publish/step-colors-materials.component/step-colors-materials.component';
import { DesignViewComponent } from './components/my-designs/design-view.component/design-view.component';
import { AddProposal } from './browse-designs/add-proposal/add-proposal';
import { Users } from './admin/users/users';
import { AdminLayout } from './admin/admin-layout/admin-layout';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard';
import { UserDetails } from './admin/users/user-details/user-details';
import { Collaborations } from './admin/collaborations/collaborations';
import { SupportTickets } from './admin/support-tickets/support-tickets';

export const routes: Routes = [
 {
    path: 'admin',
    component: AdminLayout,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, 
      { path: 'dashboard', component: AdminDashboardComponent }, 
      { path: 'users', component: Users },
      { path: 'users/:id', component: UserDetails },
      { path: 'collaborations', component: Collaborations },
      { path: 'support', component: SupportTickets },
    ]
  },

  { path: 'profile', component: Profile },
  
  { path: 'privacy', component: Privacy },
  
  { path: 'security', component: Security },
  { path: 'contact-support', component: ContactSupport },
  {
        path: 'notifications',
        loadComponent: () => 
          import('./components/Notification/notification.component/notification.component').then((m) => m.NotificationComponent),
      },
{ path: 'my-designs', component: MyDesignsComponent },
{ path: 'design-view', component: DesignViewComponent },
{ path: 'add-proposal', component: AddProposal },
{
    path: 'publish',
    component: PublishLayoutComponent,
    children: [
      { path: 'details', component: PuplishDesignComponent },          // الخطوة 2
      { path: 'colors-materials', component: StepColorsMaterialsComponent }, // الخطوة 3
      { path: 'sizes-quantity', component: StepSizesQuantityComponent },     // الخطوة 4
      { path: 'review', component:  StepReviewComponent },             // الخطوة 5
      { path: '', redirectTo: 'details', pathMatch: 'full' }
    ]
  },
];
