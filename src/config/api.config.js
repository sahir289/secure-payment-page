export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  ENDPOINTS: {
    GENERATE_PAYIN: '/payIn/generate-payin',
    VALIDATE_TOKEN: '/payIn/validate-payIn-url',
    ASSIGN_BANK: '/payIn/assign-bank',
    PROCESS_TRANSACTION: '/payIn/process',
    IMAGE_SUBMIT: '/payIn/image-submit'
  }
};
