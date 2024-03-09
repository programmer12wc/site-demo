import { create } from 'xmlbuilder2';
import fs from 'fs';

export default (req, res) => {
    var currentDate = new Date();

    const xmlData = {
        urlset: {
            '@xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9',
            '@xmlns:xhtml': 'http://www.w3.org/1999/xhtml',
            '@xmlns:image': 'http://www.google.com/schemas/sitemap-image/1.1',
            url: [
                {
                    loc: 'https://discrete.co.in/blog-list.xml',
                    lastmod: currentDate.toISOString(),
                    changefreq: 'daily',
                    priority: '0.8',
                },
                {
                    loc: 'https://discrete.co.in/blog-category.xml',
                    lastmod: currentDate.toISOString(),
                    changefreq: 'daily',
                    priority: '0.8',
                },
            ],
        },
    };

    // Create XML

    const xml = create(xmlData, { version: '1.0', encoding: 'UTF-8' }).end({ prettyPrint: true });

    // Save XML to a file
    fs.writeFileSync('./public/sitemap.xml', xml, 'utf-8');

    res.status(200).json({ result: true, message: 'sitemap.xml file create successfully.' });
};
