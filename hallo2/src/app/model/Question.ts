import { Injectable, Injector, Optional } from '@angular/core';
import { Observable } from 'rxjs';


export interface Question{
    Antwort0001?:boolean | undefined;
    Antwort0010?:boolean| undefined;
    Antwort0011?:number| undefined;
    Antwort0100?:number| undefined;
    Antwort0101?:boolean| undefined;
    Antwort0110a?:boolean| undefined;
    Antwort0110b?:boolean| undefined;
    Antwort0110c?:boolean| undefined;
    Antwort0110d?:boolean | undefined;
    Antwort0111?:number| undefined;
    Antwort1000?:boolean| undefined;
    Antwort1001?:boolean| undefined;
    Antwort1010?:boolean| undefined;
    Antwort1011?:number| undefined;
    Antwort1100?:number| undefined;
    Antwort1101?:Observable<any>| undefined;
       
    }