module.exports = {

	// afterEach : function(browser, done) {
	// 	browser.end();
	// 	done();
	// },

	'Check initialization': function(browser) {
		// console.log(browser);
		browser
			.url(browser.globals.serverUrl)
			.pause(1000);
		browser.expect.element('#project-search').value.to.equal("");
		// browser.expect.element('form[name=loginForm] input.form-control').value.to.equal("");
		browser.expect.element('#new').not.to.be.present;
		browser.expect.element('#edit').not.to.be.present;
		browser.expect.element('#delete').not.to.be.present;
		browser.expect.element('#edit-components-global-template').not.to.be.present;
		browser.expect.element('#load-feature-sets').to.not.be.enabled;
		// browser.expect.element('button#login').not.to.be.enabled;
		browser.end();
	}

};