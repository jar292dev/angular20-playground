import { Injectable } from "@angular/core";

export interface Company {
    id: number;
    name: string;
}

@Injectable({
  providedIn: 'root',
})
export class CompaniesService {
    search(term: string): Promise<Company[]> {
        const compaties = [
            { id: 1, name: 'Apple' },
            { id: 2, name: 'Microsoft' },
            { id: 3, name: 'Google' },
            { id: 4, name: 'Facebook' },
        ];

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(compaties.filter((company) => company.name.toLowerCase().includes(term.toLowerCase())));
            }, 300);
        });
    }

}