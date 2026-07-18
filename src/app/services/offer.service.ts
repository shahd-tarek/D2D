import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  private http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  publishDesign(paramsData: any, sizesFile: File | null): Observable<string> {
    let params = new HttpParams();
    const formData = new FormData();

    Object.keys(paramsData).forEach(key => {
      const val = paramsData[key];
      if (val !== undefined && val !== null) {
        if (Array.isArray(val)) {
          val.forEach(item => {
            params = params.append(key, item);
            formData.append(key, item);
          });
        } else {
          params = params.set(key, val.toString());
          formData.append(key, val.toString());
        }
      }
    });

    if (sizesFile) {
      formData.append('SizesFile', sizesFile, sizesFile.name);
    }

    return this.http.post<string>(
      `${this.baseUrl}/api/Offer/customer-publish-design`,
      formData,
      { params, responseType: 'text' as 'json' }
    );
  }

  getAllPublishedDesigns(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/Offer/get-all-published-designs`);
  }

  getPublishedDesignDetails(id: string, isPublishedOfferId: boolean = false): Observable<any> {
    const key = isPublishedOfferId ? 'PublishedOfferId' : 'DesignId';
    const params = new HttpParams().set(key, id);
    return this.http.get<any>(`${this.baseUrl}/api/Offer/get-published-design-details`, { params });
  }

  editPublishedDesign(customerPublishedOfferId: string, operations: any[]): Observable<string> {
    const body = {
      customerPublishedOfferId: customerPublishedOfferId,
      data: operations
    };

    return this.http.patch<string>(
      `${this.baseUrl}/api/Offer/edit-published-design`,
      body,
      { responseType: 'text' as 'json' }
    );
  }

  sendProducerOffer(command: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/Offer/producer-customer-offer`, command);
  }

  getPublishedDesignOffers(publishedDesignId: string): Observable<any[]> {
    const params = new HttpParams().set('PublishedDesignId', publishedDesignId);
    return this.http.get<any[]>(`${this.baseUrl}/api/Offer/get-Published-design-offers`, { params });
  }

  getAllProducerOffers(paramsData: any): Observable<any> {
    let params = new HttpParams();
    Object.keys(paramsData).forEach(key => {
      const val = paramsData[key];
      if (val !== undefined && val !== null) {
        params = params.set(key, val.toString());
      }
    });
    return this.http.get<any>(`${this.baseUrl}/api/Offer/get-all-producer-offer`, { params });
  }

  declineProducerOffer(command: { offerId: string, producerId: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/Offer/decline-producer-offer`, command);
  }
}
