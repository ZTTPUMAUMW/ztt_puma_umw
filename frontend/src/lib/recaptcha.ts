
export async function verifyRecaptcha(token: string): Promise<{
  success: boolean;
  score?: number;
  error?: string;
}> {
  try {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    
    if (!secretKey) {
      return { success: false, error: 'Brak klucza reCAPTCHA' };
    }

    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secretKey}&response=${token}`,
    });

    const data = await response.json();

    if (!data.success) {
      return { success: false, error: 'Weryfikacja reCAPTCHA nie powiodła się' };
    }

    const score = data.score || 0;
    const threshold = 0.5;

    if (score < threshold) {
      return { 
        success: false, 
        score, 
        error: `Wykryto podejrzaną aktywność (score: ${score})` 
      };
    }

    return { success: true, score };
  } catch (error) {
    console.error('Błąd weryfikacji reCAPTCHA:', error);
    return { success: false, error: 'Błąd połączenia z serwisem reCAPTCHA' };
  }
}
