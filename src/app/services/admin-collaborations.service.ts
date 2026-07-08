import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../environments/environment.prod";
import { Observable } from 'rxjs';

export interface StepDetail { item1: number; item2: number; }
export interface Steps { [key: string]: StepDetail; }

export interface CollaborationResponse {
  designId: string;
  designImages: string[];
  publishOfferName: string;
  customerName: string;
  producerName: string;
  customerImage: string | null;
  producerImage: string | null;
  deposit: number;
  amount: number;
  steps: Steps;
  createdAt: string;
  chatId: number;
  status: string;
  pageNum?: number;   
  pageSize?: number;
}

export interface GetAllProducersOffersResponse {
  allCount: number;
  completedCount: number;
  closedCount: number;
  pendingCount: number;
  collaborationResponses: CollaborationResponse[];
}
export interface ChatMessage {
  name: string;
  profileImage: string | null;
  content: string[]; 
  sentAt: string;
}

export interface ReadOnlyChatResponse {
  designId: string;
  offerName: string;
  designImages: string[];
  messages: ChatMessage[];
  chatId: number;
  publishedOfferId: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminCollaborationsService {
  private http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

getAllProducersOffers(
  pageNum: number = 1, 
  pageSize: number = 6, 
  offerName: string = '', 
  selectedStatus: 'all' | 'completed' | 'closed' | 'pending' = 'all', 
  isNewest: boolean
): Observable<GetAllProducersOffersResponse> {


  let queryParams: any = {
    Newest: isNewest,
    PageNum: pageNum,
    PageSize: pageSize
  };

  if (offerName && offerName.trim()) {
    queryParams.OfferName = offerName;
  }


  if (selectedStatus === 'completed') {
    queryParams.IsCompleted = true;
  } else if (selectedStatus === 'closed') {
    queryParams.IsClosed = true;
  } else if (selectedStatus === 'pending') {
    queryParams.IsPending = true;
  }

  
  return this.http.get<GetAllProducersOffersResponse>(
    `${this.baseUrl}/api/Admin/get-all-producers-offers`,
    { params: queryParams }
  );
}
getReadOnlyChat(chatId: number): Observable<ReadOnlyChatResponse> {
    return this.http.get<ReadOnlyChatResponse>(
      `${this.baseUrl}/api/Admin/get-readonly-chat`,
      { params: { ChatId: chatId } }
    );
  }
}