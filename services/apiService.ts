import { API_CONFIG } from "../config/api";

interface SendOTPRequest {
  phoneNumber: string;
}

interface LoginRequest {
  phoneNumber: string;
  otp: string;
}

interface RegisterPropertyOwnerRequest {
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
  ownershipType: string;
}

interface LoginResponse {
  userName: string;
  email: string;
  role: string;
  access_token: string;
}

class ApiService {
  private baseURL: string;
  private timeout: number;

  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
    this.timeout = API_CONFIG.TIMEOUT;
  }

  private async makeRequest<T>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  data?: any,
  headers?: Record<string, string>
): Promise<T> {
  const url = `${this.baseURL}${endpoint}`;
  
  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (data && (method === 'POST' || method === 'PUT')) {
    config.body = JSON.stringify(data);
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);
    
    config.signal = controller.signal;

    const response = await fetch(url, config);
    clearTimeout(timeoutId);

    const responseText = await response.text();

    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      
      try {
        const errorData = JSON.parse(responseText);
        errorMessage = errorData.message || errorMessage;
      } catch {
        errorMessage = responseText || errorMessage;
      }
      
      throw new Error(errorMessage);
    }

    if (!responseText.trim()) {
      return { success: true, message: 'Success' } as T;
    }

    try {
      return JSON.parse(responseText);
    } catch (jsonError) {
      console.log('Response is not JSON, returning as text:', responseText);
      return { 
        success: true, 
        message: 'Operation completed successfully',
        data: responseText 
      } as T;
    }

  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('Request timeout');
      }
      throw error;
    }
    throw new Error('Unknown error occurred');
  }
}

  async sendOTP(phoneNumber: string): Promise<any> {
    return this.makeRequest<any>(
      API_CONFIG.ENDPOINTS.SEND_OTP,
      'POST',
      { phoneNumber }
    );
  }

  async login(phoneNumber: string, otp: string): Promise<LoginResponse> {
    return this.makeRequest<LoginResponse>(
      API_CONFIG.ENDPOINTS.LOGIN,
      'POST',
      { phoneNumber, otp }
    );
  }

  async registerPropertyOwner(data: RegisterPropertyOwnerRequest): Promise<any> {
    return this.makeRequest<any>(
      API_CONFIG.ENDPOINTS.REGISTER_PROPERTY_OWNER,
      'POST',
      data
    );
  }

  updateBaseURL(newBaseURL: string) {
    this.baseURL = newBaseURL;
  }
}

export const apiService = new ApiService();