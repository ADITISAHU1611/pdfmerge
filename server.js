import express from 'express';
import path from 'path';
import multer from 'multer';
import { mergePdfs } from './merge.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const upload = multer({ dest: 'uploads/' });
app.use('/static', express.static('public'));

const port = 3000;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/index.html'));
});

app.post('/merge', upload.array('pdfs'), async (req, res, next) => {
  console.log(req.files);
  const filePaths = req.files.map(file => path.join(__dirname, file.path));

  try {
    let timestamp = await mergePdfs(filePaths);
    res.redirect(`http://localhost:3000/static/${timestamp}.pdf`);
  } catch (error) {
    console.error('Error merging PDFs:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
