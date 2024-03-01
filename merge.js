import PDFMerger from 'pdf-merger-js';


var merger = new PDFMerger();

const mergePdfs = async (pdfPaths) => {
  for (const pdfPath of pdfPaths) {
    await merger.add(pdfPath);
  }
  let d = new Date().getTime()
  await merger.save(`public/${d}.pdf`); 
  return d
} 

export {mergePdfs};