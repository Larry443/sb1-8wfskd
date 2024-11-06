import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import Tesseract from 'tesseract.js';

export default function DocumentScanner() {
  const { t } = useTranslation();
  const [scanning, setScanning] = useState(false);
  const [lotId, setLotId] = useState('');
  const [batchNo, setBatchNo] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleScan = async (file: File) => {
    try {
      setScanning(true);
      const result = await Tesseract.recognize(file, 'eng');
      const text = result.data.text;
      
      // Simple pattern matching for lot ID and batch number
      const lotMatch = text.match(/Lot(?:ID)?[:|\s]+([A-Z0-9]+)/i);
      const batchMatch = text.match(/Batch(?:No)?[:|\s]+([A-Z0-9]+)/i);
      
      if (lotMatch) setLotId(lotMatch[1]);
      if (batchMatch) setBatchNo(batchMatch[1]);
      
      toast.success(t('scan.success'));
    } catch (error) {
      toast.error(t('common.error'));
    } finally {
      setScanning(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleScan(file);
  };

  const createContract = async () => {
    try {
      // Simulate blockchain contract creation
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success(t('scan.contractCreated'));
    } catch (error) {
      toast.error(t('common.error'));
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6">{t('scan.title')}</h2>
          
          <div className="space-y-6">
            <div>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileSelect}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={scanning}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {scanning ? t('common.loading') : t('scan.scanButton')}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t('scan.lotId')}
                </label>
                <input
                  type="text"
                  value={lotId}
                  onChange={(e) => setLotId(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t('scan.batchNo')}
                </label>
                <input
                  type="text"
                  value={batchNo}
                  onChange={(e) => setBatchNo(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <button
              onClick={createContract}
              disabled={!lotId || !batchNo}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              {t('scan.createContract')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}