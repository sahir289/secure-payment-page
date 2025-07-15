import { API_CONFIG } from '@/config/api.config';

export async function validateToken(order, isReload) {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.VALIDATE_TOKEN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ order, isReload }),
    });
    return await response.json();
  } catch (error) {
    console.error('Error validating token:', error);
    throw error;
  }
}

export async function generatePayIn(userId, code, ot, key, hashCode, amount = null) {
  try {
    const url = new URL(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.GENERATE_PAYIN}`);
    
    // Add query parameters
    const params = {
      user_id: userId,
      code: code,
      ot: ot,
      key: key,
      hash_code: hashCode,
    };
    
    if (amount) {
      params.amount = amount;
    }

    // Append parameters to URL
    Object.keys(params).forEach(key => 
      url.searchParams.append(key, params[key])
    );

    const response = await fetch(url.toString(), {
      method: 'GET', // Changed to GET since your API uses query parameters
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    return await response.json();
  } catch (error) {
    console.error('Error generating pay in:', error);
    throw error;
  }
}
