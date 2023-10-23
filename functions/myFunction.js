
// Require the necessary modules
const fs = require('fs');
const { PDFDocument, degrees } = require('pdf-lib');

// Path to the PDF file
const pdfPath = 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf';


exports.handler = async function () {
 // Read the PDF file
 const pdfBuffer = fs.readFileSync(pdfPath);

 // Load the PDF document
 const pdfDoc = await PDFDocument.load(pdfBuffer);

 // Fetch the first page of the PDF
 const [firstPage] = await pdfDoc.copyPages([0]);

 // Rotate the page if needed
 firstPage.setRotation(degrees(0));

 // Set the desired scale
 const scale = 1.5;

 // Get the width and height of the page
 const { width, height } = firstPage.getSize();

 // Create a new canvas with the desired dimensions
 const jpgCanvas = require('canvas').createCanvas(width * scale, height * scale);

 // Render the page onto the canvas
 const jpgContext = jpgCanvas.getContext('2d');
 jpgContext.scale(scale, scale);
 await firstPage.render({ canvasContext: jpgContext }).promise;

 // Convert the canvas to a data URI
 const dataURI = jpgCanvas.toDataURL('image/jpeg');
  return {
    statusCode: 200,
    body: dataURI,
  };
};





