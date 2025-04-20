// utils/validation.ts
import { z } from 'zod';

export const validateForm = (email: string, senha: string) => {  
    const emailSchema = z.string()
    .nonempty("Email é obrigatório")
    .email('Formato de email inválido');
    
  const senhaSchema = z.string()
    .nonempty("Senha é obrigatória")
    .min(4, 'A senha deve ter pelo menos 6 caracteres');

  let errors = {
    emailError: '',
    senhaError: ''
  };

  try {
    emailSchema.parse(email);
  } catch (err) {
    if (err instanceof z.ZodError) {
      errors.emailError = err.errors[0].message;
    }
  }

  try {
    senhaSchema.parse(senha);
  } catch (err) {
    if (err instanceof z.ZodError) {
      errors.senhaError = err.errors[0].message;
    }
  }

  return errors;
};