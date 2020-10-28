import { Injectable, Injector, Optional } from '@angular/core';
import { Observable } from 'rxjs';


export interface Question{
    Antwort0001?:boolean ;
    Antwort0010?:boolean;
    Antwort0011?:number;
    Antwort0100?:number;
    Antwort0101?:boolean;
    Antwort0110a?:boolean;
    Antwort0110b?:boolean;
    Antwort0110c?:boolean;
    Antwort0110d?:boolean;
    Antwort0111?:number;
    Antwort1000?:boolean;
    Antwort1001?:boolean;
    Antwort1010?:boolean;
    Antwort1011?:number;
    Antwort1100?:number;
    Antwort1101?:Observable<any>;
    Name?:string;
       
    }