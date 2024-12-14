import axios from 'axios';

export async function checkConnectivity() {
  try {
    // Try to fetch a small resource to check connectivity
    // Using a timeout to prevent long waits
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/health`, {
      signal: controller.signal
    });

    clearTimeout(timeoutId);
    return true;
  } catch (error) {
    return false;
  }
}
