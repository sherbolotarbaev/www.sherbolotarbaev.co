'use server';

import { unstable_noStore as noStore } from 'next/cache';

export async function getViews(_request: GetViewsRequest): Promise<GetViewsResponse> {
  noStore();
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/views`, {
      method: 'GET',
    });
    if (!response.ok) return [];
    const views = await response.json();
    return views;
  } catch (error) {
    return [];
  }
}
