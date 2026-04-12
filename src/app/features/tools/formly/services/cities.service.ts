import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

export interface City {
    id: number;
    name: string;
}

export interface CitySearchForm {
  city: City | null;
  onlyCapitals: boolean;
}


@Injectable({
  providedIn: 'root',
})
export class CitiesService {
    
    private http = inject(HttpClient);

    search(term: string, onlyCapitals: boolean = false): Observable<City[]> {
        return this.http.get<City[]>('/api/cities', {
        params: { term: term, limit: '10', onlyCapitals: onlyCapitals.toString() }
        });
    }
}