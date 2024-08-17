const PdfPrinter = require('pdfmake');
const fs = require('fs');
const path=require('path');
const sendmail = require('./sendmail');

const fonts = {
    Roboto: {
        normal: path.join(__dirname, '../../public/font/Roboto-Regular.ttf'),
        bold: path.join(__dirname, '../../public/font/Roboto-Medium.ttf'),
        italics: path.join(__dirname, '../../public/font/Roboto-Italic.ttf'),
        bolditalics: path.join(__dirname, '../../public/font/Roboto-MediumItalic.ttf')
    }
};

const printer = new PdfPrinter(fonts);


const pdfmail = async () => {
	const docDefinition = {
		content: [
			{ text: 'Apple inc nasdec', style: 'subheader' },
			'Thank you for visiting us ',
			{
				bold: true,
				
				ol: [
					'Name:Divyesh Bhakhar',
					'Address:Sarthana jakatnaka',
					'surat:395006'
				]
			},
			{
				style: 'tableExample',
				table: {
					widths: [100, '*', 200, '*'],
					body: [
						['Product Name', 'Quantity', 'Rate', 'Total'],
						[
							'Rolex Dummy var 2', 
							{ 
								text:'1', 
								italics: true 
							}, 
							{ 
								text: '$4500', 
								italics: true 
							}, 
							{ 
								text: '$4500', italics: true
							}
						],
					]
				}

			},
			{ text: 'Apple inc nasdec', style: 'subfooter' },
			'Thank you for buying with us',
		]

	};

	// const options = {

	// }

	const location=path.join(__dirname,"../../public/assets/document.pdf")

	var pdfDoc = printer.createPdfKitDocument(docDefinition);
	pdfDoc.pipe(fs.createWriteStream(location));
	pdfDoc.end();
	await sendmail()

}

module.exports = pdfmail


