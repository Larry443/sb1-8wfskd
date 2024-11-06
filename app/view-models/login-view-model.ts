import { Observable, Frame, Application } from '@nativescript/core';
import { Biometrics } from '@nativescript/biometrics';
import { Phone } from '@nativescript/phone';
import * as Toast from 'nativescript-toast';
import { localize } from '@nativescript/localize';

export class LoginViewModel extends Observable {
    private email: string = '';
    private password: string = '';
    private otp: string = '';
    private isOtpLogin: boolean = false;
    private isLoading: boolean = false;
    private biometrics: Biometrics;
    private currentLanguage: string = 'en';

    constructor() {
        super();
        this.biometrics = new Biometrics();
        this.set('isOtpLogin', false);
        this.set('isLoading', false);
    }

    async onLogin() {
        if (!this.email) {
            this.showToast(localize('common.error'), 'Please enter email');
            return;
        }

        try {
            this.set('isLoading', true);
            // Implement actual login logic here
            await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
            Frame.topmost().navigate('views/scan-page');
        } catch (error) {
            this.showToast(localize('common.error'), error.message);
        } finally {
            this.set('isLoading', false);
        }
    }

    async onToggleOtpLogin() {
        this.set('isOtpLogin', !this.isOtpLogin);
        if (this.isOtpLogin && this.email) {
            await this.sendOtp();
        }
    }

    async sendOtp() {
        if (!this.email) {
            this.showToast(localize('common.error'), 'Please enter email');
            return;
        }

        try {
            this.set('isLoading', true);
            // Implement OTP sending logic here
            await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
            this.showToast(localize('common.success'), 'OTP sent successfully');
        } catch (error) {
            this.showToast(localize('common.error'), error.message);
        } finally {
            this.set('isLoading', false);
        }
    }

    async onVerifyOtp() {
        if (!this.otp) {
            this.showToast(localize('common.error'), 'Please enter OTP');
            return;
        }

        try {
            this.set('isLoading', true);
            // Implement OTP verification logic here
            await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
            Frame.topmost().navigate('views/scan-page');
        } catch (error) {
            this.showToast(localize('common.error'), error.message);
        } finally {
            this.set('isLoading', false);
        }
    }

    onResendOtp() {
        this.sendOtp();
    }

    async onBiometricLogin() {
        try {
            const result = await this.biometrics.verifyFingerprintWithCustomFallback({
                message: 'Scan your fingerprint',
                fallbackMessage: 'Use password instead'
            });

            if (result.code === 0) {
                Frame.topmost().navigate('views/scan-page');
            }
        } catch (error) {
            this.showToast(localize('common.error'), error.message);
        }
    }

    onChangeLanguage() {
        this.currentLanguage = this.currentLanguage === 'en' ? 'es' : 'en';
        Application.setResources({ lang: this.currentLanguage });
        this.showToast(localize('common.success'), 'Language changed');
    }

    private showToast(title: string, message: string) {
        Toast.makeText(`${title}: ${message}`).show();
    }
}