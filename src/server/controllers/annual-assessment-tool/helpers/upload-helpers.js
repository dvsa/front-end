export const getFileExtension = fileName => {
  if (typeof fileName !== 'string') return console.log('Filename is not a string value');
  return fileName.substr(fileName.lastIndexOf('.') + 1);
}

export const isFileExtensionOfType = (ext, extType) => {
  return (typeof val === extType);
}