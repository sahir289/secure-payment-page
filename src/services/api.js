import { API_CONFIG } from '@/config/api.config';

export default async function validateToken(order, isReload) {
  try {
    if (!order) {
      throw new Error('Order ID is required for validation.');
    }

    const params = new URLSearchParams();
    params.append('isReload', isReload);

    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.VALIDATE_TOKEN}/${order}?${params.toString()}`);
    return await response.json();
  } catch (error) {
    console.error('Error validating token:', error);
    throw error;
  }
}

export default async function generatePayIn(userId, code, ot, key, hashCode, amount = null) {
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

export default async function assignBankToPayInUrl(orderId, data) {

  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ASSIGN_BANK}/${orderId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    return await response.json();
  } catch (error) {
    console.error('Error assigning bank:', error);
    throw error;
  }
}

export default async function processTransaction(merchantOrderId, data) {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PROCESS_TRANSACTION}/${merchantOrderId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    return await response.json();
  } catch (error) {
    console.error('Error processing transaction:', error);
    throw error;
  }
}

export default async function imageSubmit(merchantOrderId, formData) {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.IMAGE_SUBMIT}/${merchantOrderId}`, {
      method: 'POST',
      body: formData // FormData automatically sets the correct Content-Type
    });
    return await response.json();
  } catch (error) {
    console.error('Error submitting image:', error);
    throw error;
  }
}
