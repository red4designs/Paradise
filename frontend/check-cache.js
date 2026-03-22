const https = require('https');
https.get('https://www.paradisevattavada.com', res => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    let hasLazy = d.includes('loading="lazy"');
    console.log('GitHub Edge Cache Synced (Has Lazy):', hasLazy);
  });
});
