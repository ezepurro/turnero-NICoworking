

export const formatPhoneNumber = (input) => {
    let cleaned = ('' + input).replace(/\D/g, '');
  
    if (!cleaned.startsWith('54')) {
        return cleaned;
    }
  
    const remainingNumber = cleaned.substring(2);
  
    if (remainingNumber.startsWith('9')) {
        const areaCode = remainingNumber.substring(1, 4);
        const localNumber = remainingNumber.substring(4);
        const formattedNumber = `54${areaCode}15${localNumber}`;
        return '+' + formattedNumber;
    }
  
    if (remainingNumber.length >= 3) {
        const areaCode = remainingNumber.substring(0, 3);
        const localNumber = remainingNumber.substring(3);
        const formattedNumber = `54${areaCode}15${localNumber}`;
        return '+' + formattedNumber;
    }
  
    return '+' + cleaned;
  };
