import jsPDF from 'jspdf';

const imageToDataUrl = async (url) => {
  try {
    const res = await fetch(url);
    const blob = await res.blob();
    const format = blob.type === 'image/webp' ? 'WEBP' : blob.type === 'image/png' ? 'PNG' : 'JPEG';

    const dataUrl = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });

    return { dataUrl, format };
  } catch (err) {
    console.error('Image conversion failed', err);
    return null;
  }
};

const formatCurrency = (value) => `Rs ${value}`;

export const buildCartPdf = async (cartItems, { includePrices = true } = {}) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let y = 20;

  // Header / branding
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('Balaji Traders', pageWidth / 2, y, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  y += 10;

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0);

  doc.setFontSize(14);
  doc.text('Items', pageWidth / 2, y, { align: 'center' });
  y += 10;

  doc.setFontSize(11);
  doc.text(`Total items: ${totalQuantity}`, 14, y);
  if (includePrices) {
    doc.text(`Total price: ${formatCurrency(totalPrice)}`, pageWidth - 14, y, { align: 'right' });
  }
  y += 20;

  for (const item of cartItems) {
    if (y > pageHeight - 40) {
      doc.addPage();
      y = 20;
    }

    const imageData = item.image ? await imageToDataUrl(item.image) : null;

    doc.setFontSize(13);
    doc.text(item.name, 14, y);
    doc.setFontSize(11);

    const lineParts = [];
    if (includePrices) {
      lineParts.push(`Price: ${formatCurrency(item.price)}`);
    }
    lineParts.push(`Qty: ${item.quantity}`);
    if (includePrices) {
      lineParts.push(`Subtotal: ${formatCurrency(item.price * item.quantity)}`);
    }
    doc.text(lineParts.join('  '), 14, y + 6);

    if (imageData) {
      // Slightly larger, medium quality for better clarity
      doc.addImage(imageData.dataUrl, imageData.format, pageWidth - 62, y - 10, 50, 40, undefined, 'MEDIUM');
    }

    y += 48; // extra breathing room between items
  }

  const summaryText = [
    `Total items: ${totalQuantity}`,
    includePrices ? `Total price: ${formatCurrency(totalPrice)}` : null,
    'Items:',
    ...cartItems.map(item => {
      const base = `- ${item.name} x${item.quantity}`;
      if (!includePrices) return base;
      return `${base} = ${formatCurrency(item.price * item.quantity)}`;
    })
  ].filter(Boolean).join('\n');

  const blob = doc.output('blob');
  return { blob, summaryText };
};
