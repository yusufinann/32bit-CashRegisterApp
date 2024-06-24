import React from 'react';

const PrinterTest = ({ t }) => {
  const handlePrint = () => {
    const content = '<h1>Printer Test...</h1><p>This is a printer test.</p>';
    
    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    printWindow.document.open();
    printWindow.document.write(`
      <html>
        <head>
          <title>${t('Print Preview')}</title>
        </head>
        <body>
          ${content}
        </body>
      </html>
    `);
    printWindow.document.close();

    // Print the content
    printWindow.print();
  };

  return (
    <div>
      <h1>{t('Printer Test')}</h1>
      <p>{t('This is a printer test. Click the button below to print.')}</p>
      <button onClick={handlePrint}>{t('Print')}</button>
      <div className="print-content">
        <h2>{t('Content to Print')}</h2>
        <p>{t('This content will be displayed during printing.')}</p>
      </div>
    </div>
  );
};

export default PrinterTest;
