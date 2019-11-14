const fs = require("fs");
const path = require("path");
const puppeteer = require('puppeteer');
const handlebars = require("handlebars");

const createPdf = async () => {
    console.log('lets go');

    const data = {
        title: "A new Brazilian School",
        date: "05/12/2018",
        name: "Rodolfo Luis Marcos",
        age: 28,
        birthdate: "12/07/1990",
        course: "Computer Science",
        obs: "Graduated in 2014 by Federal University of Lavras, work with Full-Stack development and E-commerce."
    }

    const templateHtml = fs.readFileSync(path.join(process.cwd(), '/src/pdf/template-pdf.html'), 'utf8');
	const template = handlebars.compile(templateHtml);
	const html = template(data);

	let milis = new Date();
	milis = milis.getTime();

	const pdfPath = `${data.name}-${milis}.pdf`;

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

    console.log(html);
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
}

module.exports = createPdf;