import { GuestbookEntry, Profile } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      // Handle empty responses (like DELETE)
      const text = await response.text();
      return text ? JSON.parse(text) : ({} as T);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('An unexpected error occurred');
    }
  }

  // Profile endpoints
  async getProfile(): Promise<Profile> {
    return this.request<Profile>('/profile');
  }

  // Guestbook endpoints
  async getGuestbookEntries(): Promise<GuestbookEntry[]> {
    return this.request<GuestbookEntry[]>('/guestbook');
  }

  async getGuestbookEntry(id: number): Promise<GuestbookEntry> {
    return this.request<GuestbookEntry>(`/guestbook/${id}`);
  }

  async createGuestbookEntry(data: { name: string; message: string }): Promise<GuestbookEntry> {
    return this.request<GuestbookEntry>('/guestbook', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateGuestbookEntry(
    id: number,
    data: { name?: string; message?: string }
  ): Promise<GuestbookEntry> {
    return this.request<GuestbookEntry>(`/guestbook/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteGuestbookEntry(id: number): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/guestbook/${id}`, {
      method: 'DELETE',
    });
  }

  async getGuestbookCount(): Promise<{ count: number }> {
    return this.request<{ count: number }>('/guestbook/count');
  }

  // Health check
  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    return this.request<{ status: string; timestamp: string }>('/health');
  }
}

export const api = new ApiService(API_BASE_URL);
export default api;
