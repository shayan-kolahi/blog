import { InjectionToken } from '@angular/core';
import { environment } from './environment.config';

export const ENVIRONMENT = new InjectionToken('environment', {
  providedIn: 'root',
  factory: () => environment
});
