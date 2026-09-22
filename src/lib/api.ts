/**
 * Frontend API Client for PHP Backend
 * Target Host: portfolio.harshaicreations.com
 */

export const API_BASE_URL = 
  process.env.NEXT_PUBLIC_API_URL || 
  (typeof window !== 'undefined' && window.location.hostname === 'localhost'
    ? 'http://localhost/portfolio/backend/api'
    : 'https://portfolio.harshaicreations.com/api');

export interface ProjectData {
  id: number;
  title: string;
  src: string;
  thumbnail?: string;
  description?: string;
  tools_used?: string;
  is_featured?: boolean;
}

export interface DynamicProjectsResponse {
  'ai-ads'?: ProjectData[];
  'ai-teasers'?: ProjectData[];
}

/**
 * Fetch dynamic projects grouped by category (AI Ads, AI Teasers)
 */
export async function fetchProjectsGrouped(): Promise<DynamicProjectsResponse | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/projects.php?grouped=true`, {
      next: { revalidate: 60 } // ISR revalidation every 60 seconds
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.success ? json.data : null;
  } catch (err) {
    console.warn('Could not connect to PHP API, using static fallback:', err);
    return null;
  }
}

/**
 * Send contact inquiry to PHP Backend
 */
export async function submitContactInquiry(payload: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}): Promise<{ success: boolean; message: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}/contact.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    return {
      success: data.success,
      message: data.message || (data.success ? 'Message sent!' : 'Failed to send message.')
    };
  } catch (err) {
    return {
      success: false,
      message: 'Network error connecting to backend.'
    };
  }
}
