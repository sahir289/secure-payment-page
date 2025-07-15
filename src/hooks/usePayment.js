import { useState, useRef, useEffect } from 'react';
import { validateToken, generatePayIn } from '@/services/api';
import { useRouter } from 'next/navigation';
// import { toast } from '@/components/ui/toast';

export function usePayment() {
  const [merchantOrderId, setMerchantOrderId] = useState('');
  const [isValidated, setIsValidated] = useState(false);
  const [showExpiredModal, setShowExpiredModal] = useState(false);
  const [accessDenied, setAccessDenied] = useState('');
  const [redirectUrl, setRedirectUrl] = useState('');
  
  // Payment method states
  const [upi, setUpi] = useState(false);
  const [phonePay, setPhonePay] = useState(false);
  const [bank, setBank] = useState(false);
  
  // Payment details
  const [code, setCode] = useState('');
  const [minAmount, setMinAmount] = useState(0);
  const [maxAmount, setMaxAmount] = useState(0);
  const [amount, setAmount] = useState('');
  const [selectMethod, setSelectMethod] = useState(false);

  // Timer states
  const [remainingTime, setRemainingTime] = useState(10 * 60); // 10 minutes
  const [expireTime] = useState(Date.now() + 10 * 60 * 1000);
  const [startTime] = useState(Date.now());

  const validateCalledRef = useRef(false);
  const apiCalledRef = useRef(false);
  const router = useRouter();

  const validateAmount = (amount, minAmount, maxAmount) => {
    const numericAmount = Number(amount);
    const numericMinAmount = Number(minAmount);
    const numericMaxAmount = Number(maxAmount);

    if (numericAmount < numericMinAmount || numericAmount > numericMaxAmount) {
    //   toast.error(`Amount must be between ${minAmount} and ${maxAmount}`);
      return false;
    }
    return true;
  };

  useEffect(() => {
    // Save timer in session storage
    sessionStorage.setItem('expireSession', expireTime.toString());
    sessionStorage.setItem('startSession', startTime.toString());

    // Timer logic
    if (!showExpiredModal && remainingTime > 0) {
      const timer = setInterval(() => {
        setRemainingTime(prev => {
          if (prev <= 1) {
            setShowExpiredModal(true);
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [showExpiredModal, expireTime, startTime]);

  const handleValidation = async (order, isReload) => {
    if (!order) return;

    try {
      validateCalledRef.current = true;
      setMerchantOrderId(order);
      const response = await validateToken(order, isReload);

      if (response?.data?.data?.error) {
        setRedirectUrl(response?.data?.data?.result?.redirect_url);
        setShowExpiredModal(true);
        setIsValidated(true);
      } else if (response?.data?.data) {
        const data = response.data.data;
        setUpi(data.is_qr);
        setPhonePay(data.is_phonepay);
        setBank(data.is_bank);
        setCode(data.code);
        setMinAmount(data.min_amount);
        setMaxAmount(data.max_amount);
        setRedirectUrl(data.redirect_url);
        setIsValidated(true);

        if (data.amount > 0) {
          setAmount(data.amount);
          setSelectMethod(true);
        }
      }
    } catch (error) {
      console.error('Validation error:', error);
      setShowExpiredModal(true);
    }
  };

  const handlePaymentInitialization = async (params) => {
    const { userId, code, ot, key, hashCode } = params;

    if (apiCalledRef.current || !userId || !code || !ot || !key) return;

    try {
      apiCalledRef.current = true;
      
      // Enable all payment methods by default
      setUpi(true);
      setPhonePay(true);
      setBank(true);
      setSelectMethod(true);
      setIsValidated(true);
      
      const response = await generatePayIn(
        userId,
        code,
        ot,
        key,
        hashCode
      );

      if (response.error) {
        toast.error(response.error.message);
        setTimeout(() => setShowExpiredModal(true), 15000);
        return null;
      } 
      
      if (response.data?.merchantOrderId) {
        const newOrderId = response.data.merchantOrderId;
        setMerchantOrderId(newOrderId);
        sessionStorage.setItem('paymentInitiated', 'true');

        const url = `/transaction/${hashCode}?order=${newOrderId}`;
        window.history.pushState({}, '', url);

        return { orderId: newOrderId };
      }
    } catch (error) {
      apiCalledRef.current = false;
      setShowExpiredModal(true);
      console.error('Payment initialization error:', error);
      return null;
    }
  };

  return {
    state: {
      merchantOrderId,
      isValidated,
      showExpiredModal,
      accessDenied,
      redirectUrl,
      upi,
      phonePay,
      bank,
      code,
      minAmount,
      maxAmount,
      amount,
      selectMethod,
      remainingTime,
      expireTime,
      startTime,
    },
    actions: {
      handleValidation,
      handlePaymentInitialization,
      setShowExpiredModal,
      setAmount,
      setSelectMethod,
      validateAmount,
    },
  };
}
