const delay = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, 3000);
  });
}

export const recalls = async (req, res) => {
  await delay();
  res.type('text/html');
  res.send('<p>Sample recalls data returned from ajax call.</p>');
};
