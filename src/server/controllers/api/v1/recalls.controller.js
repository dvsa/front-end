const delay = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, 3000);
  });
};

export const recalls = async (req, res) => {
  await delay();
  res.type('text/html');
  res.send(`<p>The following '<strong>${req.body.test_variable}</strong>' was taken from the ajax request body.</p>`);
};
