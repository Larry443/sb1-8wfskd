import { Observable } from '@nativescript/core';
import * as Toast from 'nativescript-toast';

export class ScanViewModel extends Observable {
    private _lotId: string = '';
    private _batchNo: string = '';
    private _status: string = '';
    private _canSendToBlockchain: boolean = false;
    private _canValidate: boolean = false;

    constructor() {
        super();
        this.set('canSendToBlockchain', false);
        this.set('canValidate', false);
        this.set('status', 'Enter document details');
    }

    get lotId(): string {
        return this._lotId;
    }

    set lotId(value: string) {
        if (this._lotId !== value) {
            this._lotId = value;
            this.notifyPropertyChange('lotId', value);
            this.validateFields();
        }
    }

    get batchNo(): string {
        return this._batchNo;
    }

    set batchNo(value: string) {
        if (this._batchNo !== value) {
            this._batchNo = value;
            this.notifyPropertyChange('batchNo', value);
            this.validateFields();
        }
    }

    private validateFields() {
        const isValid = this._lotId && this._batchNo;
        this.set('canSendToBlockchain', isValid);
    }

    async onProcessDocument() {
        if (!this._lotId || !this._batchNo) {
            Toast.makeText('Please enter both Lot ID and Batch No').show();
            return;
        }

        try {
            // Simulate processing
            this.set('status', 'Processing document...');
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            this.set('status', 'Document processed successfully');
            this.set('canValidate', true);
            
            Toast.makeText('Document processed successfully').show();
        } catch (error) {
            this.set('status', 'Error processing document');
            Toast.makeText('Error processing document').show();
        }
    }

    async onSendToBlockchain() {
        try {
            this.set('status', 'Sending to blockchain...');
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            this.set('status', 'Contract created on blockchain');
            Toast.makeText('Contract created successfully').show();
        } catch (error) {
            this.set('status', 'Error creating contract');
            Toast.makeText('Error creating contract').show();
        }
    }

    async onValidateContract() {
        try {
            this.set('status', 'Validating contract...');
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            this.set('status', 'Contract validated successfully');
            Toast.makeText('Contract validated').show();
        } catch (error) {
            this.set('status', 'Error validating contract');
            Toast.makeText('Error validating contract').show();
        }
    }
}