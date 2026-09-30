require('dotenv').config();
const express = require('express');
const mailchimp = require('@mailchimp/mailchimp_marketing');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY || 'dummy',
  server: process.env.MAILCHIMP_SERVER_PREFIX || 'us1',
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function getProductTruth() {
  try {
    const rawData = fs.readFileSync(path.join(__dirname, 'public', 'data', 'product_truth.json'), 'utf8');
    const data = JSON.parse(rawData);

    const reportPath = path.join(__dirname, 'verification', 'report.json');
    if (fs.existsSync(reportPath)) {
      const reportData = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
      data.verification_report = reportData;
    }
    return data;
  } catch (err) {
    console.error('Error reading product_truth.json:', err);
    return { brand: { name: 'Arcane Codex' }, modules: [], devkit: { categories: [] }, devlog: [], roadmap: [] };
  }
}

function getAssetCatalog() {
  try {
    const rawData = fs.readFileSync(path.join(__dirname, 'public', 'data', 'asset_catalog.json'), 'utf8');
    return JSON.parse(rawData);
  } catch (err) {
    return { catalog: [] };
  }
}

app.get('/', (req, res) => {
  res.render('index', {
    productTruth: getProductTruth(),
    assetCatalog: getAssetCatalog()
  });
});

app.get('/api/status', (req, res) => {
  const truth = getProductTruth();
  truth.asset_catalog = getAssetCatalog();
  res.json(truth);
});

app.post('/subscribe', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required' });

  try {
    if (process.env.MAILCHIMP_API_KEY && process.env.MAILCHIMP_API_KEY !== 'dummy') {
      await mailchimp.lists.addListMember(process.env.MAILCHIMP_LIST_ID, {
        email_address: email,
        status: 'subscribed',
      });
    }
    res.status(200).json({ message: 'Successfully subscribed!' });
  } catch (error) {
    if (error.response && error.response.body && error.response.body.title === 'Member Exists') {
        return res.status(200).json({ message: 'You are already subscribed!' });
    }
    res.status(500).json({ error: 'Mailing list connected. Configure .env for live API.' });
  }
});

app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});
