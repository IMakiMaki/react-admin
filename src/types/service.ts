import { AxiosInstance } from 'axios';
export interface ServiceConstructorConfig {
  prefix: string;
  timeout?: number;
}

export type FetchType = Pick<AxiosInstance, 'get' | 'post' | 'delete' | 'put' | 'patch'>;
