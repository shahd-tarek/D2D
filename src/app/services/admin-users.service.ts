import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../environments/environment.prod";
import { Observable } from 'rxjs';

export interface UserResponse {
  id: string;
  name: string;
  email: string;
  type: string;
  status: string;
  numOfReports: number;
  numOfCollations: number;
  joinDate: string;
}

export interface GetAllUsersResponse {
  allUsersCount: number;
  allCustomersCount: number;
  allProducersCount: number;
  allStatusesCount: number;
  activeStatusCount: number;
  pendingStatusCount: number;
  susbendStatusCount: number;
  usersResponse: UserResponse[];
  pageNum?: number;   
  pageSize?: number;
}

export interface CustomerProfileDetails {
  id: string;
  type: string;
  status: string;
  name: string;
  addressForCustomer: string | null;
  profileImageUrl: string | null;
  email: string;
  phoneNumber: string | null;
  anonName: string;
  joinDate: string;
  reportCount: number;
  totalCollaborations: number;
  totalEarned: number;
  frontSideIdUrl: string | null;
  backSideIdUrl: string | null;
  personalImageUrl: string | null;
  licenseUrlForProducer: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class AdminUsersService {
  private http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;


getAllUsers(
  pageNum: number = 1, 
  pageSize: number = 6, 
  tabType: 'All' | 'Customer' | 'Producer' = 'All',
  statusFilter: 'All' | 'Active' | 'Pending' | 'Suspended' = 'All',
  searchText: string = ''
): Observable<GetAllUsersResponse> {
  

  const httpParams: any = {
    PageNum: pageNum.toString(),
    PageSize: pageSize.toString()
  };


  if (tabType === 'Customer') httpParams.isCustomer = 'true';
  if (tabType === 'Producer') httpParams.isProducer = 'true';
  if (tabType === 'All') httpParams.isAllUsers = 'true';


  if (statusFilter === 'All') httpParams.isAllStatus = 'true';
  if (statusFilter === 'Active') httpParams.isActive = 'true';
  if (statusFilter === 'Pending') httpParams.isPending = 'true';
  if (statusFilter === 'Suspended') httpParams.isSusbending = 'true';


  httpParams.isNewst = 'true'; 
  httpParams.ReportNumTextSearch = 'false';
  
  if (searchText && searchText.trim() !== '') {
    httpParams.UserAnnonNameTextSearch = searchText;
  }

  return this.http.get<GetAllUsersResponse>(
    `${this.baseUrl}/api/Admin/get-all-users`, 
    { params: httpParams }
  );
}

  getCustomerProfile(id: string): Observable<CustomerProfileDetails> {
    return this.http.get<CustomerProfileDetails>(
      `${this.baseUrl}/api/Admin/get-customer-profile`,
      {
        params: {
          id: id
        }
      }
    );
  }

  getProducerProfile(id: string): Observable<CustomerProfileDetails> {
    return this.http.get<CustomerProfileDetails>(
      `${this.baseUrl}/api/Admin/get-producer-profile`,
      {
        params: { id }
      }
    );
  }

  changeUserStatus(id: string, status: number): Observable<any> {
    const body = { id: id, status: status };
    return this.http.post<any>(`${this.baseUrl}/api/Admin/change-user-status`, body);
  }
}