import {expect} from 'chai';
import jsdom from 'jsdom/lib/old-api';
import fs from 'fs';

describe("Our first test", () => {
	it('should pass', () => {
		expect(true).to.equal(true);
	});
});

describe('index.html', () => {
	it('should have h1 that says users', (done) => {
		const index = fs.readFileSync('./src/index.html', 'utf-8');
		//Can pass js to run on the file as secondary parameters
		jsdom.env(index, function (err, window) {
			const h1 = window.document.getElementsByTagName('h1')[0];
			expect(h1.innerHTML).to.equal('Users');
			//free memory associated with the window
			done();
			window.close();
		});
	});
});
