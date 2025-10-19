#!/usr/bin/env node
// submit_form_puppeteer.js
// Usage: node submit_form_puppeteer.js --name="Иван Иванов" --phone="+7 (999) 999-99-99" --email="i@example.com" --city="Новосибирск" --form_type="financial"

const puppeteer = require('puppeteer');

function parseArgs() {
  const args = process.argv.slice(2);
  const out = {};
  args.forEach(arg => {
    const m = arg.match(/^--([a-zA-Z0-9_\-]+)=(.*)$/);
    if (m) out[m[1]] = m[2];
  });
  return out;
}

(async () => {
  const args = parseArgs();
  const name = args.name || 'Тест Пользователь';
  const phone = args.phone || '+7 (900) 000-00-00';
  const email = args.email || 'test@example.com';
  const city = args.city || 'Москва';
  const form_type = args.form_type || 'financial';
  const url = args.url || 'https://starrychildhood.ru/';
  const headful = args.headful === '1' || args.headful === 'true';

  console.log('Submitting form with:', { name, phone, email, city, form_type, url, headful });

  const browser = await puppeteer.launch({ headless: headful ? false : 'new' });
  try {
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

    // Wait for grecaptcha to be available (site loads reCAPTCHA v3)
    await page.waitForFunction(() => window.grecaptcha !== undefined, { timeout: 15000 }).catch(() => {});

    // Read CSRF token from the page
    const csrf = await page.evaluate(() => {
      const el = document.querySelector('input[name="csrf_token"]');
      return el ? el.value : null;
    });

    console.log('Found csrf_token:', csrf ? 'yes' : 'no');

    // Acquire a reCAPTCHA v3 token by executing grecaptcha on the page context
    let recaptchaToken = null;
    try {
      recaptchaToken = await page.evaluate(async () => {
        if (!window.grecaptcha || !window.grecaptcha.execute) {
          return null;
        }
        const SITE_KEY = '6LePQJUrAAAAAEp6I4K7gwhMoP-HJSv7Sq7VyM4P'; // same as site
        return await new Promise((resolve) => {
          try {
            window.grecaptcha.ready(() => {
              window.grecaptcha.execute(SITE_KEY, { action: 'submit_form' }).then(token => {
                resolve(token);
              }).catch(err => resolve(null));
            });
          } catch (e) {
            resolve(null);
          }
        });
      });
    } catch (err) {
      recaptchaToken = null;
    }

    console.log('reCAPTCHA token obtained:', recaptchaToken ? 'yes' : 'no');

    // Submit the form from page context (keeps same-origin cookies/headers)
    const response = await page.evaluate(async (data) => {
      try {
        const fd = new FormData();
        fd.append('form_type', data.form_type);
        if (data.csrf) fd.append('csrf_token', data.csrf);
        fd.append('name', data.name);
        fd.append('phone', data.phone);
        if (data.email) fd.append('email', data.email);
        if (data.city) fd.append('city', data.city);
        if (data.recaptcha) fd.append('g-recaptcha-response', data.recaptcha);

        const res = await fetch('/send.php', {
          method: 'POST',
          body: fd,
          credentials: 'same-origin'
        });

        const text = await res.text();
        let json = null;
        try { json = JSON.parse(text); } catch (e) { json = { raw: text }; }
        return { status: res.status, ok: res.ok, body: json };
      } catch (err) {
        return { error: err.message };
      }
    }, { name, phone, email, city, form_type, csrf, recaptcha: recaptchaToken });

    console.log('Server response:', response);

    if (response && response.ok && response.body && response.body.success) {
      console.log('Form submitted successfully. Message from server:', response.body.message || JSON.stringify(response.body));
    } else if (response && response.body) {
      console.warn('Submission finished but server responded with non-success:', response.body);
    } else {
      console.error('Submission failed or returned unexpected response:', response);
    }

  } catch (err) {
    console.error('Error during submission:', err);
  } finally {
    await browser.close();
  }
})();
