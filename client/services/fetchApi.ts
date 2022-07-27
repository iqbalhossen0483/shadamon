export async function fetchApi(url: string, options?: RequestInit | undefined) {
  try {
    const res = await fetch(url, options);
    const data = await res.json();
    if (res.ok) {
      return { data, error: null };
    } else {
      return { data: null, error: data };
    }
  } catch (error: any) {
    return { data: null, error };
  }
}
