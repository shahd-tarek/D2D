import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-details',
  imports: [RouterLink],
  templateUrl: './user-details.html',
  styleUrl: './user-details.css',
})
export class UserDetails implements OnInit{
  userId: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // جلب معرف المستخدم من مسار الرابط (URL) في حال تم إرسال معرّف ديناميكي
    this.userId = this.route.snapshot.paramMap.get('id');
  }

}
