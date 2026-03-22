const fs = require('fs');
try {
  const data = JSON.parse(fs.readFileSync('./lighthouse-live.json', 'utf8'));
  const lcpAudit = data.audits['largest-contentful-paint-element'];
  console.log('LCP Value:', data.audits.metrics.details.items[0].largestContentfulPaint);
  
  if (lcpAudit && lcpAudit.details && lcpAudit.details.items && lcpAudit.details.items[0]) {
    const node = lcpAudit.details.items[0].node;
    console.log('LCP Element Label:', node.nodeLabel);
    console.log('LCP Element Snippet:', node.snippet);
  } else {
    console.log('No specific LCP node details found.');
  }

  // Find what took the longest
  const opps = Object.values(data.audits)
    .filter(a => a.details && a.details.type === 'opportunity')
    .sort((a, b) => b.details.overallSavingsMs - a.details.overallSavingsMs)
    .slice(0, 5);
  
  console.log('--- Top Opportunities ---');
  opps.forEach(o => {
    if (o.details.overallSavingsMs > 0) {
      console.log(`${o.title}: ${o.details.overallSavingsMs}ms`);
    }
  });

} catch (e) {
  console.error('Error parsing JSON:', e.message);
}
