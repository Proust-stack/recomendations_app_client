import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// export const generatePDF = async (imagePath, text) => {
//   //const element = document.getElementById("review");
//   const pdf = new jsPDF("p", "mm", "a4");
//   const xhr = new XMLHttpRequest();
//   const pageHeight = pdf.internal.pageSize.height;
//   const pageWidth = pdf.internal.pageSize.width;
//   xhr.responseType = "blob";
//   xhr.open("GET", imagePath);
//   xhr.send();
//   xhr.onload = (event) => {
//     const blob = xhr.response;
//     //pdf.addImage(blob, "JPEG", 40, 40, pageWidth, pageHeight);
//     pdf.text(30, 20, text);
//     pdf.save("download.pdf");
//   };
// };
//const canvas = await html2canvas(element);
//const imgData = await downLoadImg(imagePath);

// pdf.output('dataurlnewwindow');
// };

// const downLoadImg = async (imgUrl) => {
//   const xhr = new XMLHttpRequest();
//   xhr.responseType = "blob";
//   xhr.open("GET", imgUrl);
//   xhr.send();
//   xhr.onload = (event) => {
//     const blob = xhr.response;
//     console.log(blob);
//     return blob;
//   };
// };

export const generatePDF = async () => {
  const element = document.getElementById("review");
  const canvas = await html2canvas(element, {
    allowTaint: true,
    useCORS: true,
    windowWidth: element.scrollWidth,
    windowHeight: element.scrollHeight,
  });
  const image = canvas.toDataURL("image/png", 1.0);
  const pdf = new jsPDF("p", "mm", "a4");
  const pageHeight = pdf.internal.pageSize.height;
  const pageWidth = pdf.internal.pageSize.width;
  pdf.addImage(image, "PNG", 0, 0, pageWidth, pageHeight);
  //pdf.addImage(imageUrl, "JPEG", 10, 10, 180, 180);
  pdf.save("myPDF.pdf");
};
