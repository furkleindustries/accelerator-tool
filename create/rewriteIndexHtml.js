const fs = require('fs-extra');
const makeTemplateReplacements = require('../functions/makeTemplateReplacements');
const path = require('path');

module.exports = async function rewriteIndexHtml(directory, name) {
  const indexPath = path.join(directory, 'index.html');
  const data = await fs.readFile(indexPath, 'utf8');

  const rewrittenData = makeTemplateReplacements({
    data,
    name,
    /* %PUBLIC_URL% is replaced in the index.html file by the CRA build
     * system and replacing it here would probably break things. */
    dontReplacePublicUrl: true,
  });

  await fs.write(indexPath, rewrittenData);
};
