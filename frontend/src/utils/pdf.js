import jsPDF from "jspdf";


const formatCurrency = (value) => `Rs${value}`;

const addWatermark = (doc) => {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  doc.saveGraphicsState();
  doc.setTextColor(200);
  doc.setFontSize(48);
  doc.setFont("helvetica", "bold");

  doc.text("Balaji Traders", pageWidth / 2, pageHeight / 2, {
    align: "center",
    angle: 45,
  });

  doc.restoreGraphicsState();
};

export const buildCartPdf = async (
  cartItems,
  { includePrices = true } = {}
) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  let y = 20;

  
  addWatermark(doc);

  
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("BALAJI TRADERS", pageWidth / 2, y, { align: "center" });

  y += 8;
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text("Cart Summary / Quotation", pageWidth / 2, y, {
    align: "center",
  });

  y += 15;

  
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Item", 14, y);
  doc.text("Qty", pageWidth - 80, y, { align: "right" });

  if (includePrices) {
    doc.text("Price", pageWidth - 50, y, { align: "right" });
    doc.text("Amount", pageWidth - 14, y, { align: "right" });
  }

  y += 4;
  doc.line(14, y, pageWidth - 14, y);
  y += 8;

  
  doc.setFont("helvetica", "normal");

  let totalQty = 0;
  let totalAmount = 0;

  for (const item of cartItems) {
    if (y > pageHeight - 40) {
      doc.addPage();
      addWatermark(doc);
      y = 20;
    }

    const showPrice = item.showPrice !== false;
    const priceValue = showPrice ? Number(item.price) || 0 : 0;
    const amount = showPrice ? priceValue * item.quantity : 0;
    totalQty += item.quantity;
    totalAmount += amount;

    doc.text(item.name, 14, y);
    doc.text(String(item.quantity), pageWidth - 80, y, {
      align: "right",
    });

    if (includePrices) {
      doc.text(
        showPrice ? formatCurrency(priceValue) : "N/A",
        pageWidth - 50,
        y,
        { align: "right" }
      );
      doc.text(
        showPrice ? formatCurrency(amount) : "N/A",
        pageWidth - 14,
        y,
        { align: "right" }
      );
    }

    y += 6;
    doc.setDrawColor(220);
    doc.line(14, y, pageWidth - 14, y);
    y += 8;
  }

  
  y += 10;
  doc.setDrawColor(0);
  doc.line(pageWidth - 90, y, pageWidth - 14, y);
  y += 8;

  doc.setFont("helvetica", "bold");
  doc.text("Total Quantity:", pageWidth - 90, y);
  doc.text(String(totalQty), pageWidth - 14, y, { align: "right" });

  if (includePrices) {
    y += 8;
    doc.text("Grand Total:", pageWidth - 90, y);
    doc.text(formatCurrency(totalAmount), pageWidth - 14, y, {
      align: "right",
    });
  }

 
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(120);
  doc.text(
    "Thank you for shopping with Balaji Traders!",
    pageWidth / 2,
    pageHeight - 10,
    { align: "center" }
  );

  const blob = doc.output("blob");

  const summaryText = cartItems
    .map((item) => {
      const showPrice = item.showPrice !== false;
      const amount = showPrice ? (Number(item.price) || 0) * item.quantity : 0;
      return `${item.name} x${item.quantity}${
        includePrices && showPrice ? ` = ${formatCurrency(amount)}` : ""
      }`;
    })
    .join("\n");

  return { blob, summaryText };
};
