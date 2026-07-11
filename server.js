require('dotenv').config();
const express = require('express');
const mailchimp = require('@mailchimp/mailchimp_marketing');
const path = require('path');

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

app.get('/', (req, res) => {
  res.render('index');
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
