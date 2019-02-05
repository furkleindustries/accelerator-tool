const fs = require('fs-extra');
const makeTemplateReplacements = require('../functions/makeTemplateReplacements');
const path = require('path');

module.exports = async function rewriteIndexHtml(directory, config) { 
  const indexPath = path.join(directory, 'templates', 'index.html');
  const data = await fs.readFile(indexPath, 'utf8');

  const rewrittenData = makeTemplateReplacements({
    config,
    data,
    /* Do not replace the publicUrl. This would break routing. */
    dontReplacePublicUrl: true,
  });

  await fs.writeFile(indexPath, rewrittenData);
};
