import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CoupleData } from '../models/couple.model';
import { UserProgress } from '../models/user-progress.model';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly baseUrl = environment.apiBaseUrl;

  constructor(private readonly http: HttpClient) {}

  createCouple(payload: { userId: string; userName: string }): Observable<CoupleData> {
    return this.http.post<CoupleData>(`${this.baseUrl}/api/couples`, payload);
  }

  joinCouple(id: string, payload: { userId: string; userName: string }): Observable<CoupleData> {
    return this.http.post<CoupleData>(`${this.baseUrl}/api/couples/${id}/join`, payload);
  }

  getProgress(userId: string): Observable<UserProgress> {
    return this.http.get<UserProgress>(`${this.baseUrl}/api/progress/${userId}`);
  }

  addXp(userId: string, amount: number): Observable<UserProgress> {
    return this.http.post<UserProgress>(`${this.baseUrl}/api/progress/${userId}/add-xp`, { amount });
  }
}
