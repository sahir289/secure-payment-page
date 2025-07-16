export const API_CONFIG = {
//   BASE_URL: 'https://api.staging.trustpays24.com/v1',
BASE_URL: 'http://localhost:8090/v1', // Adjust this to your actual API base URL
  
  ENDPOINTS: {
    GENERATE_PAYIN: '/payIn/generate-payin',
    VALIDATE_TOKEN: '/payIn/validate-payIn-url',  // Assuming this is your validation endpoint
    ASSIGN_BANK: '/payIn/assign-bank',
    PROCESS_TRANSACTION: '/payIn/process',
    IMAGE_SUBMIT: '/payIn/image-submit'
  }
};
