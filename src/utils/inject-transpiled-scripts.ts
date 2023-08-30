export default (
  fileContent: string,
  originalScriptsBodies: Array<string>,
  transpiledScriptsBodies: Array<string>
) => {
  if (transpiledScriptsBodies.length !== originalScriptsBodies.length) {
    return fileContent;
  }

  let fileContentCopy = fileContent;
  transpiledScriptsBodies.forEach((transpiledScriptBody, index) => {
    fileContentCopy = fileContentCopy.replace(
      originalScriptsBodies[index],
      transpiledScriptBody
    );
  });

  return fileContentCopy;
};
