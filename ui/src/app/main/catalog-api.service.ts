import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EMPTY, Observable, of} from 'rxjs';
import {Country, CountryCode} from '../domain/Country';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CatalogApiService {

    private countries: Country[];
    private countriesObservable: Observable<Country[]>;

    private countryObservable: Observable<Country>;

    constructor(private http: HttpClient) {
    }

    getCountries(): Observable<Country[]> {
        if (this.countries) {
            return of(this.countries);
        }

        this.countriesObservable = this.http.get<Country[]>(this.getCountryUrl('')).pipe(
            tap(x => {
                this.countries = x;
            }),
            catchError(err => {
                delete this.countriesObservable;
                return EMPTY;
            }));

        return this.countriesObservable;
    }

    getCountry(countryCode: CountryCode): Observable<Country> {
        if (!countryCode) {
            return EMPTY;
        }

        if (this.countries) {
            const country = this.countries.find(value => value.code === countryCode);

            if (country) {
                return of(country);
            }
        }

        this.countryObservable = this.http.get<Country>(this.getCountryUrl(`/${countryCode}`));

        return this.countryObservable;
    }

    refreshCountry() {
        this.http.get<Country[]>(this.getCountryUrl('')).pipe(
            tap(x => {
                this.countries = x;
            })
        ).subscribe();
    }

    private getCountryUrl(path: string) {
        return `/api/countries${path}`;
    }

}
