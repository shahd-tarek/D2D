import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../environments/environment.prod";

export interface UsersCountResponse {
  customerCount: number;
  producerCount: number;
  customerPercentage: number;
  producerPercentage: number;
}
export interface RecentUser {
  id: string;
  name: string;
  profileImage: string | null;
  type: string;
  status: string;
  createdAt: string;
}
export interface RecentTicket {
  id: number;
  issueType: string;
  status: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {
  private http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  getUsersCount(): Observable<UsersCountResponse> {

    return this.http.get<UsersCountResponse>(`${this.baseUrl}/api/Admin/get-users-count`);
  }

  getRecentUsers(): Observable<RecentUser[]> {
  return this.http.get<RecentUser[]>(
    `${this.baseUrl}/api/Admin/get-recent-users`
  );
}

getRecentTickets(): Observable<RecentTicket[]> {
  return this.http.get<RecentTicket[]>(
    `${this.baseUrl}/api/Admin/get-recent-tickets`
  );
}
}