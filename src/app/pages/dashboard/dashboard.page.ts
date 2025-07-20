import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
    selector: 'app-auth',
    templateUrl: './dashboard.page.html',
    styleUrls: ['./dashboard.page.scss'],
    standalone: true,
    imports: [CommonModule, RouterModule]
})

export class DashboradPage {
    userStats = {
    totalUsers: 12345,
    activeUsers: 8765,
    newSignupsToday: 120
  };

  recentActivities = [
    { id: 1, description: 'John Doe published a new article.', time: '2 hours ago' },
    { id: 2, description: 'Jane Smith updated her profile.', time: '5 hours ago' },
    { id: 3, description: 'New comment on "Angular Best Practices".', time: '1 day ago' },
    { id: 4, description: 'Admin reviewed user reports.', time: '2 days ago' }
  ];

  quickLinks = [
    { name: 'Manage Articles', url: '/articles' },
    { name: 'View User Profiles', url: '/profiles' },
    { name: 'System Settings', url: '/settings' },
    { name: 'Generate Report', url: '/reports' }
  ];
}
