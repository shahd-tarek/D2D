import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../environments/environment.prod";
import { Observable } from "rxjs";

export interface Ticket {
  id: number;
  submitedBy: string; 
  issueType: string;
  status: string;
  description: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  // 1. ضيفنا الـ page هنا كـ parameter وتلقائي قيمته 1 لو متبعتش
  getAllTickets(
    filter?: 'all' | 'resolved' | 'open' | 'inprogress', 
    page: number = 1 
  ): Observable<Ticket[]> {
    
    // 2. هنا الـ page بقت مقروءة وسليمة 100%
    let params = new HttpParams().set('PageNum', page.toString()); 
    
    if (filter) {
      if (filter === 'all') params = params.set('isAll', 'true');
      if (filter === 'resolved') params = params.set('isResolved', 'true');
      if (filter === 'open') params = params.set('isOpen', 'true');
      if (filter === 'inprogress') params = params.set('isInProgress', 'true');
    } else {
      params = params.set('isAll', 'true');
    }
      
    return this.http.get<Ticket[]>(`${this.baseUrl}/api/Admin/get-all-tickets`, { params });
  }

  changeTicketStatus(ticketId: number, status: number) {
  return this.http.post(
    `${this.baseUrl}/api/Admin/change-ticket-status`,
    {},
    {
      params: {
        TicketId: ticketId,
        Status: status
      }
    }
  );
}
}