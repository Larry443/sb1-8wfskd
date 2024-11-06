import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      login: {
        title: 'Supply Chain Login',
        email: 'Email',
        password: 'Password',
        loginButton: 'Sign in',
        otpLogin: 'Login with OTP',
        passwordLogin: 'Login with Password',
        success: 'Login successful'
      },
      scan: {
        title: 'Document Scanner',
        scanButton: 'Scan Document',
        lotId: 'Lot ID',
        batchNo: 'Batch Number',
        createContract: 'Create Blockchain Contract',
        success: 'Document scanned successfully',
        contractCreated: 'Contract created successfully'
      },
      common: {
        error: 'An error occurred',
        loading: 'Loading...'
      }
    }
  },
  es: {
    translation: {
      login: {
        title: 'Inicio de Sesión',
        email: 'Correo electrónico',
        password: 'Contraseña',
        loginButton: 'Iniciar sesión',
        otpLogin: 'Iniciar con OTP',
        passwordLogin: 'Iniciar con contraseña',
        success: 'Inicio de sesión exitoso'
      },
      scan: {
        title: 'Escáner de Documentos',
        scanButton: 'Escanear Documento',
        lotId: 'ID de Lote',
        batchNo: 'Número de Lote',
        createContract: 'Crear Contrato Blockchain',
        success: 'Documento escaneado exitosamente',
        contractCreated: 'Contrato creado exitosamente'
      },
      common: {
        error: 'Ocurrió un error',
        loading: 'Cargando...'
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;