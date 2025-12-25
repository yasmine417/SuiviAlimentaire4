import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CaloriesRecord {
  id?: number;
  mealName: string;
  calories: number;
  proteins: number;         
  carbs: number;             
  fat: number;               
  ocrText: string;
  recommendations: string;   
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class IaCaloriesService {
  private baseUrl = 'http://localhost:8084/api/calories'; 

  constructor(private http: HttpClient) {}

  calculateCalories(mealName: string, ocrText: string): Observable<CaloriesRecord> {
    // Appel GET ou POST selon ton backend
    return this.http.post<CaloriesRecord>(`${this.baseUrl}/calculate`, { mealName, ocrText });
  }
}
