import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.prod';

export interface DesignResponse {
  id: string;
  name: string;
  status: string; // e.g. "Draft", "Published", etc.
  images: string[];
  createdAt: string;
  publishedAt: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class DesignService {
  private http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  getCustomerDesigns(
    customerId: string, 
    name?: string, 
    status?: number, 
    pageSize?: number, 
    pageNum?: number
  ): Observable<DesignResponse[]> {
    let params = new HttpParams().set('CustomerId', customerId);
    if (name) params = params.set('Name', name);
    if (status !== undefined && status !== null) params = params.set('Status', status.toString());
    if (pageSize !== undefined && pageSize !== null) params = params.set('PageSize', pageSize.toString());
    if (pageNum !== undefined && pageNum !== null) params = params.set('PageNum', pageNum.toString());

    return this.http.get<DesignResponse[]>(`${this.baseUrl}/api/Design/get-customer-designs`, { params });
  }

  deleteDesign(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/api/Design/delete-design/${id}`);
  }

  getDesign(id: string): Observable<string> {
    return this.http.get(`${this.baseUrl}/api/Design/get-design/${id}`, { responseType: 'text' });
  }

  publishedToDrafted(designId: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/Design/published-to-drafted`, { designId });
  }

  createDesign(userId: string, designId: string | null, userMessage: string): Observable<any> {
    const body = {
      userId,
      designId: designId || '',
      userMessage
    };
    return this.http.post<any>(`${this.baseUrl}/api/ChatModel/Create-design`, body);
  }

  saveDesign(id: string, name: string, designImage: File): Observable<string> {
    const formData = new FormData();
    formData.append('Id', id);
    formData.append('Name', name);
    formData.append('DesignImage', designImage, designImage.name);

    return this.http.post<string>(`${this.baseUrl}/api/Design/save-design`, formData, { responseType: 'text' as 'json' });
  }
}
