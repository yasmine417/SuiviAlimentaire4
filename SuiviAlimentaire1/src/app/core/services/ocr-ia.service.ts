import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface IaResult {
  mealName: string;
  ocrText: string;
  calories: number;
  suggestions: string[];
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class OcrIaService {

  // Microservice OCR
  private ocrUrl = 'http://localhost:8082/api/ocr/upload';
  // Microservice IA
  private iaUrl = 'http://localhost:8084/api/calories';

  constructor(private http: HttpClient) {}

  // Upload de l'image pour OCR
  uploadImage(file: File): Observable<{mealName: string, ocrText: string}> {
    const formData = new FormData();
    formData.append('image', file); // le nom "image" doit correspondre au @RequestParam côté Spring Boot
    return this.http.post<{mealName: string, ocrText: string}>(this.ocrUrl, formData);
  }

  // Calcul des calories après OCR
  calculateCalories(mealName: string, ocrText: string): Observable<IaResult> {
    return this.http.post<IaResult>(this.iaUrl, { mealName, ocrText });
  }
}
