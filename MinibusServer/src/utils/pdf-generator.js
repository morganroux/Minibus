const fs = require("fs");
const path = require("path");
const puppeteer = require('puppeteer');
const handlebars = require("handlebars");
const sendPdf = require('./email');

const createPdf = async (data) => {
    console.log(data);


    const templateHtml = fs.readFileSync(path.join(process.cwd(), '/src/utils/template-pdf.html'), 'utf8');
	const template = handlebars.compile(templateHtml);
	const html = template(data);

	let milis = new Date();
	milis = milis.getTime();

	const pdfPath = 'minibus.pdf'; //`Minibus-${milis}.pdf`;

	const options = {
		width: '1230px',
		headerTemplate: "<p></p>",
		footerTemplate: "<p></p>",
		displayHeaderFooter: false,
		margin: {
			top: "10px",
			bottom: "30px"
		},
		printBackground: true,
		path: pdfPath
	}
	const browser = await puppeteer.launch({
		args: ['--no-sandbox'],
		headless: true
	});

	const page = await browser.newPage();
	await page.setContent(html, {
        waitUntil: 'networkidle0'
    });

	await page.pdf(options);
    await browser.close();
   await sendPdf(pdfPath);
}

module.exports = createPdf;