import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {

  constructor(private http: HttpClient) { }

  getApiData(): Observable<any> {
    return this.http.get('https://api.covid19india.org/data.json');
  }
}
