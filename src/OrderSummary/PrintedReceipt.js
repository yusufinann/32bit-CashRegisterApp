const PrintedReceipt = ({ cart, saleId, paymentType, user, receivedMoney, partialPayment, Total, subTotal, tax }) => {
    return `
      <html>
        <head>
          <title>Fatura Yazdır</title>
          <style>
            @page {
              size: auto;
              margin: 0;
            }
            body {
              font-family: Arial, sans-serif;
              color: black;
            }
            .receipt-container {
              max-width: 320px;
              margin: 20px auto;
              padding: 20px;
              border: 1px solid #ddd;
              border-radius: 5px;
              background-color: #fff;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .receipt-header {
              text-align: center;
              margin-bottom: 20px;
              font-size: 12px;
              color: black;
            }
            .receipt-line {
              display: flex;
              justify-content: space-between;
              margin-bottom: 5px;
              font-size: 12px;
            }
            .receipt-line.divider {
            }
            .receipt-line.bottom {
              text-align: center;
              margin-top: 10px;
              font-size: 10px;
            }
          </style>
        </head>
        <body>
          <div class="receipt-container">
            <div class="receipt-header">
              <h2>ÖRNEK İŞLETME</h2>
              <p>DEMİRCİKARA MAH. 1431 SOK. NO:12</p>
              <p>0242 311 41 21</p>
              <p>ANTALYA</p>
            </div>
            <div class="receipt-line date">
              <span>TARİH : ${new Date().toLocaleDateString("tr-TR")}</span>
              <span class="time">
                SAAT : ${new Date().toLocaleTimeString("tr-TR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
            <div class="receipt-line">
              <span>SATIŞ NO: ${saleId}</span>
              <span class="time">SATIŞ : ${paymentType}</span>
            </div>
            <div class="receipt-line">
              <span>KASİYER : ${user.personelInfo.name}</span>
            </div>
            <div class="receipt-line divider">--------------------------------------------------------------------------------
     </div>
            <div class="receipt-body">
              ${cart.map(item => `
                <div class="receipt-line">
                  <span>${item.product.barcode} (${item.quantity} × ${item.product.price.toFixed(2)})</span>
                </div>
                <div class="receipt-line">
                  <span>${item.product.name} - %${item.product.vat_rate}</span>
                  <span>${item.totalPrice}</span>
                </div>
              `).join('')}
            </div>
            <div class="receipt-line divider">--------------------------------------------------------------------------------</div>
            ${partialPayment ? `
              <div class="receipt-line">
                <span>Kart ile ödenen</span>
                <span>${(Total - receivedMoney)}</span>
              </div>
              <div class="receipt-line">
                <span>Nakit ile ödenen</span>
                <span>${receivedMoney}</span>
              </div>
            ` : `
              <div class="receipt-line">
                <span>ALINAN PARA</span>
                <span>${receivedMoney}</span>
              </div>
              <div class="receipt-line">
                <span>PARA ÜSTÜ</span>
                <span>${(receivedMoney - Total)}</span>
              </div>
            `}
            <div class="receipt-line divider">--------------------------------------------------------------------------------
     </div>
            <div class="receipt-line">
              <span>ARA TOPLAM</span>
              <span>${subTotal}</span>
            </div>
            <div class="receipt-line">
              <span>KDV</span>
              <span>${tax}</span>
            </div>
            <div class="receipt-line">
              <span>GENEL TOPLAM</span>
              <span>${Total}</span>
            </div>
            <div class="receipt-line bottom">KDV FİŞİ DEĞİLDİR</div>
          </div>
          <script>
            window.onload = function() {
              window.print();
            };
          </script>
        </body>
      </html>
    `;
  };
  
  export default PrintedReceipt;
  