export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: string;
}

export interface Address {
  city: string;
  county: string;
  district: string;
  municipality: string;
  municipalityNumber: number;
  postNumber: number;
  street: string;
  type: string;
  typeCode: number;
}
