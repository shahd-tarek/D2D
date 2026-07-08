import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.prod';

export interface TokenResponse {
  userID: string;
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: string;
  refreshTokenExpiresAt: string;
  data?: string;
}

export interface RegisterResponse {
  userId: string;
  email: string;
  userType: number;
  nextStep: string;
}

export interface VerifyOtpResponse {
  userId: string;
  userType: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  getAccessToken(): string | null {
    return localStorage.getItem('d2d_access_token') || sessionStorage.getItem('d2d_access_token');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('d2d_refresh_token') || sessionStorage.getItem('d2d_refresh_token');
  }

  setTokens(accessToken: string, refreshToken: string, rememberMe?: boolean): void {
    const shouldPersist = rememberMe !== undefined 
      ? rememberMe 
      : !sessionStorage.getItem('d2d_access_token');
    
    if (shouldPersist) {
      localStorage.setItem('d2d_access_token', accessToken);
      localStorage.setItem('d2d_refresh_token', refreshToken);
      sessionStorage.removeItem('d2d_access_token');
      sessionStorage.removeItem('d2d_refresh_token');
    } else {
      sessionStorage.setItem('d2d_access_token', accessToken);
      sessionStorage.setItem('d2d_refresh_token', refreshToken);
      localStorage.removeItem('d2d_access_token');
      localStorage.removeItem('d2d_refresh_token');
    }
  }

  clearTokens(): void {
    localStorage.removeItem('d2d_access_token');
    localStorage.removeItem('d2d_refresh_token');
    sessionStorage.removeItem('d2d_access_token');
    sessionStorage.removeItem('d2d_refresh_token');
  }

  getUserRole(): string | null {
    const token = this.getAccessToken();
    if (!token) return null;
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;
      const decoded = atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'));
      const payload = JSON.parse(decoded);
      console.log('DEBUG_JWT_PAYLOAD:', payload);

      // Look for standard ASP.NET Identity role claim and fallback role claims
      const roleClaim = payload['role'] ||
        payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] ||
        payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/role'];

      if (roleClaim) {
        const roleStr = String(roleClaim).toLowerCase();
        if (roleStr === 'manufacturer') return 'producer';
        if (roleStr === 'client') return 'customer';
        return roleStr;
      }

      // Check userType claims if role is not found
      const userType = payload['userType'] || payload['UserType'] || payload['user_type'];
      if (userType !== undefined) {
        const typeNum = Number(userType);
        if (typeNum === 2) return 'customer';
        if (typeNum === 3) return 'producer';
        if (typeNum === 4) return 'designer';
      }
      return null;
    } catch (e) {
      console.error('DEBUG_JWT_DECODE_ERROR:', e);
      return null;
    }
  }

  getUserId(): string | null {
    const token = this.getAccessToken();
    if (!token) return null;
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;
      const decoded = atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'));
      const payload = JSON.parse(decoded);
      return payload['nameid'] ||
        payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] ||
        payload['sub'] ||
        payload['uid'] ||
        payload['UserId'] ||
        payload['userId'] ||
        null;
    } catch (e) {
      console.error('Error decoding token for userId:', e);
      return null;
    }
  }

  setTempRegData(userId: string, email: string, userType: number): void {
    sessionStorage.setItem('d2d_temp_userId', userId);
    sessionStorage.setItem('d2d_temp_email', email);
    sessionStorage.setItem('d2d_temp_userType', String(userType));
  }

  getTempRegData() {
    return {
      userId: sessionStorage.getItem('d2d_temp_userId'),
      email: sessionStorage.getItem('d2d_temp_email'),
      userType: sessionStorage.getItem('d2d_temp_userType') ? Number(sessionStorage.getItem('d2d_temp_userType')) : null,
    };
  }

  clearTempRegData(): void {
    sessionStorage.removeItem('d2d_temp_userId');
    sessionStorage.removeItem('d2d_temp_email');
    sessionStorage.removeItem('d2d_temp_userType');
  }

  // --- PERSISTENT REGISTRATION STATE HELPERS ---
  setRegStatus(status: 'step1_completed' | 'email_verified' | 'step2_completed', userId: string, email: string, userType: number): void {
    localStorage.setItem('d2d_reg_status', status);
    localStorage.setItem('d2d_reg_userId', userId);
    localStorage.setItem('d2d_reg_email', email);
    localStorage.setItem('d2d_reg_userType', String(userType));
  }

  getRegStatus() {
    return {
      status: localStorage.getItem('d2d_reg_status') as 'step1_completed' | 'email_verified' | 'step2_completed' | null,
      userId: localStorage.getItem('d2d_reg_userId'),
      email: localStorage.getItem('d2d_reg_email'),
      userType: localStorage.getItem('d2d_reg_userType') ? Number(localStorage.getItem('d2d_reg_userType')) : null,
    };
  }

  clearRegStatus(): void {
    localStorage.removeItem('d2d_reg_status');
    localStorage.removeItem('d2d_reg_userId');
    localStorage.removeItem('d2d_reg_email');
    localStorage.removeItem('d2d_reg_userType');
  }

  // --- API CALLS ---

  /** POST /api/Auth/register */
  register(payload: any): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.baseUrl}/api/Auth/register`, payload);
  }

  /** POST /api/Auth/send-otp */
  sendOtp(id: string, email: string, flag: boolean): Observable<VerifyOtpResponse> {
    return this.http.post<VerifyOtpResponse>(`${this.baseUrl}/api/Auth/send-otp`, { id, email, flag });
  }

  /** POST /api/Auth/verify-otp */
  verifyOtp(userId: string, otp: string, flag: boolean): Observable<VerifyOtpResponse> {
    return this.http.post<VerifyOtpResponse>(`${this.baseUrl}/api/Auth/verify-otp`, { userId, otp, flag });
  }

  /** POST /api/Auth/customer-registeration */
  customerRegister(queryParams: {
    CustomerId: string;
    AppartmentNo: string;
    BuildingNumber: number;
    Street: string;
    District: string;
    City: string;
    Goverate: string;
  }, files: {
    FrontImageID: File;
    BackImageID: File;
    PersonalImage: File;
  }): Observable<any> {
    const formData = new FormData();
    formData.append('CustomerId', queryParams.CustomerId);
    formData.append('AppartmentNo', queryParams.AppartmentNo);
    formData.append('BuildingNumber', queryParams.BuildingNumber.toString());
    formData.append('Street', queryParams.Street);
    formData.append('District', queryParams.District);
    formData.append('City', queryParams.City);
    formData.append('Goverate', queryParams.Goverate);

    formData.append('FrontImageID', files.FrontImageID);
    formData.append('BackImageID', files.BackImageID);
    formData.append('PersonalImage', files.PersonalImage);

    return this.http.post<any>(`${this.baseUrl}/api/Auth/customer-registeration`, formData);
  }

  /** POST /api/Auth/producer-registeration */
  producerRegister(
    producerId: string,
    files: {
      FrontImageID: File;
      BackImageID: File;
      PersonalImage: File;
      LicenseUrls: File;
    }
  ): Observable<any> {
    const formData = new FormData();
    formData.append('ProducerId', producerId);
    formData.append('FrontImageID', files.FrontImageID);
    formData.append('BackImageID', files.BackImageID);
    formData.append('PersonalImage', files.PersonalImage);
    formData.append('LicenseUrls', files.LicenseUrls);

    return this.http.post<any>(`${this.baseUrl}/api/Auth/producer-registeration`, formData);
  }

  /** POST /api/Auth/login */
  login(payload: any): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${this.baseUrl}/api/Auth/login`, payload);
  }

  /** POST /api/Auth/send-login-link */
  sendLoginLink(userID: string): Observable<string> {
    return this.http.post(`${this.baseUrl}/api/Auth/send-login-link`, { userID }, { responseType: 'text' });
  }

  /** GET /api/Auth/verify-magic-token */
  verifyMagicToken(token: string): Observable<TokenResponse> {
    const params = new HttpParams().set('Token', token).set('token', token);
    const url = this.baseUrl
      ? `${this.baseUrl}/api/Auth/verify-magic-token`
      : `/api/Auth/verify-magic-token`;
    return this.http.get<TokenResponse>(url, { params });
  }

  /** POST /api/Auth/forget-password */
  forgetPassword(payload: any): Observable<string> {
    return this.http.post(`${this.baseUrl}/api/Auth/forget-password`, payload, { responseType: 'text' });
  }

  /** POST /api/AccountSettings/change-password */
  changePassword(payload: any): Observable<string> {
    return this.http.post(`${this.baseUrl}/api/AccountSettings/change-password`, payload, { responseType: 'text' });
  }

  /** POST /api/Auth/refresh-token?refreshToken=<token> */
  refreshToken(token: string): Observable<TokenResponse> {
    let params = new HttpParams().set('refreshToken', token);
    return this.http.post<TokenResponse>(`${this.baseUrl}/api/Auth/refresh-token`, "", { params });
  }

  /** POST /api/Auth/signout */
  signout(token: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/Auth/signout`, JSON.stringify(token), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
