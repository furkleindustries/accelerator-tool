module.exports = function makeGenericTemplateReplacements({
  data,
  name,
})
{
  return data.toString().split('%NAME%').join(name);
};
