Submit the website contact/financial forms with Puppeteer

This folder contains a small Node.js script that opens https://starrychildhood.ru/, fills the modal form and posts it the same way the site does (including obtaining reCAPTCHA v3 token when possible).

Requirements
- Node.js 18+ (or recent LTS)
- npm

Install

```bash
cd scripts
npm init -y
npm install puppeteer
```

Run

```bash
# default test submission
node submit_form_puppeteer.js

# provide custom fields
node submit_form_puppeteer.js --name="Иван Иванов" --phone="+7 (999) 999-99-99" --email="ivan@example.com" --city="Новосибирск" --form_type="financial"

# run with visible browser for debugging
node submit_form_puppeteer.js --headful=true
```

Notes
- The script uses the page's reCAPTCHA site key and attempts to call grecaptcha.execute in the page context to obtain a token. If Google blocks or token cannot be obtained, submission proceeds without it (server may reject the request).
- This script reproduces the same POST to `/send.php` as the site. Use responsibly and respect the site's terms and rate limits.
- For automation (CI) or high-volume sending, integrate with site owners or use server-side API keys.
