import React, { useRef } from 'react';
import { useCart } from '../context/CartContext';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const PdfDownloadButton = () => {
  const { cartItems } = useCart();
  const invoiceRef = useRef();

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 2000 ? 0 : 99;
  const total = subtotal + shipping;

  const generatePDF = async () => {
    if (cartItems.length === 0) return;

    // Capture the invoice preview as image
    const canvas = await html2canvas(invoiceRef.current, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
    });
    const imgData = canvas.toDataURL('image/png');

    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const imgHeight = (imgData.height * pageWidth) / imgData.width;
    let heightLeft = imgHeight;
    let position = 20; // Start Y position

    // Header
    doc.setFontSize(20);
    doc.text('ShopReact Ecommerce - Invoice', pageWidth / 2, 20, { align: 'center' });
    doc.setFontSize(12);
    doc.text('Order Summary', pageWidth / 2, 35, { align: 'center' });
    doc.line(20, 40, pageWidth - 20, 40);

    // Add cart image (scaled)
    let yPosition = 50;
    if (imgHeight < pageHeight - 50) {
      doc.addImage(imgData, 'PNG', 20, yPosition, pageWidth - 40, imgHeight);
      yPosition += imgHeight + 10;
    }

    // Add totals if not captured
    doc.setFontSize(16);
    doc.text(`Subtotal: ₹${subtotal.toLocaleString()}`, 20, yPosition);
    doc.text(`Shipping: ${shipping === 0 ? 'Free' : `₹${shipping}`}`, 20, yPosition + 10);
    doc.setFontSize(20);
    doc.text(`Total: ₹${total.toLocaleString()}`, 20, yPosition + 25, { align: 'right' });

    // Footer
    doc.line(20, pageHeight - 30, pageWidth - 20, pageHeight - 30);
    doc.setFontSize(10);
    doc.text('Thank you for shopping with ShopReact!', pageWidth / 2, pageHeight - 15, { align: 'center' });
    doc.text('Generated on: ' + new Date().toLocaleString(), 20, pageHeight - 5);

    doc.save('shopreact-invoice.pdf');
  };

  return (
    <>
      <button className="pdf-download-btn" onClick={generatePDF} disabled={cartItems.length === 0}>
        📄 Download Invoice PDF
      </button>
      {/* Hidden invoice preview for capture */}
      <div ref={invoiceRef} style={{ position: 'absolute', left: '-9999px', width: '400px', background: 'white', padding: '20px' }}>
        <h2>Invoice Preview</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: '10px', fontSize: '12px' }}>
          {cartItems.map(item => (
            <React.Fragment key={item.id}>
              <img src={item.image} alt="" style={{width: '40px', height: '40px', objectFit: 'cover'}} />
              <div>
                <div>{item.name}</div>
                <div>{item.category}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                Qty: {item.quantity}<br />
                ₹{(item.price * item.quantity).toLocaleString()}
              </div>
            </React.Fragment>
          ))}
        </div>
        <hr />
        <div style={{ textAlign: 'right', fontWeight: 'bold' }}>
          Total: ₹{subtotal + (subtotal > 2000 ? 0 : 99).toLocaleString()}
        </div>
      </div>
    </>
  );
};

export default PdfDownloadButton;

