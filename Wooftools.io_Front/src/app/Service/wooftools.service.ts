import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, timeout } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WoofToolsService {
  UrlApi = 'http://localhost:3002/';
  UrlApiShared = this.UrlApi + 'shared/';
  UrlApiPair = this.UrlApi + 'pair/';

  constructor(private http: HttpClient) {}
  async getShared(
    string: string,
    chain: string,
    interval: string
  ): Promise<any> {
    if (string === 'updated') {
      chain = '';
      interval = '';
    } else if (string === 'exchanges') {
      interval = '';
    }
    return await firstValueFrom(
      this.http
        .get<[]>(`${this.UrlApiShared}${string}`, {
          headers: { chain: chain, interval: interval },
        })
        .pipe(timeout(10000))
    );
  }
  async getSharedChain(): Promise<any> {
    return await firstValueFrom(
      this.http.get<[]>(`${this.UrlApiShared}Chain`).pipe(timeout(10000))
    );
  }
  async getPair(string: string, chain: string, pair: string): Promise<any> {
    return await firstValueFrom(
      this.http
        .get<[]>(`${this.UrlApiPair}${string}`, {
          headers: { chain: chain, pair: pair },
        })
        .pipe(timeout(10000))
    );
  }
  async getQuery(query: string): Promise<any> {
    return await firstValueFrom(
      this.http
        .get<[]>(`${this.UrlApi}Search`, {
          headers: { query: query },
        })
        .pipe(timeout(10000))
    );
  }
  async getQueryChain(query: string, chain: string): Promise<any> {
    return await firstValueFrom(
      this.http
        .get<[]>(`${this.UrlApi}Search/Chain`, {
          headers: { query: query, chain: chain },
        })
        .pipe(timeout(10000))
    );
  }
  async getSwap(): Promise<any> {
    return await firstValueFrom(
      this.http.get<[]>(`${this.UrlApi}Swap`).pipe(timeout(10000))
    );
  }
}
