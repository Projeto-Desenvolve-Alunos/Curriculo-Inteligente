import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const generatePdf = async (elementId: string) => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error("Elemento com o ID especificado não encontrado.");
    return;
  }

  const canvas = await html2canvas(element, { scale: 2 });
  const imgData = canvas.toDataURL('image/jpeg', 1.0);
  const pdf = new jsPDF('p', 'mm', 'a4');
  const imgProps = pdf.getImageProperties(imgData);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

  if (pdfHeight > pdf.internal.pageSize.getHeight()) {
    const pageHeight = pdf.internal.pageSize.getHeight();
    let position = 0;

    while (position < pdfHeight) {
      pdf.addImage(imgData, 'JPEG', 0, -position, pdfWidth, pdfHeight);
      position += pageHeight;
      if (position < pdfHeight) {
        pdf.addPage();
      }
    }
  } else {
    pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
  }

  pdf.save('curriculo.pdf');
};