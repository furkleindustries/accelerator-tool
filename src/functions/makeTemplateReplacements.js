import {
  compile,
} from 'handlebars';
import {
  assert,
} from 'ts-assertions';

export function makeTemplateReplacements({
  config,
  data,
  dontReplacePublicUrl,
  name,
})
{
  assert(
    config,
    'The config argument was not provided to makeTemplateReplacements.',
  );

  const handlebarsContext = {
    ...config,
    name: name || config.name,
    publicUrl: dontReplacePublicUrl ? undefined : config.publicUrl,
  };

  return compile(data)(handlebarsContext);
}
