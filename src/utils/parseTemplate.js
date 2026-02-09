import handlebars from 'handlebars';
import fs from 'node:fs/promises';
import path from 'node:path';

export const parseTemplate = async (templateName, data) => {
  // 1. Şablon dosyasının tam yolunu bul
  const templatePath = path.join(
    process.cwd(),
    'src',
    'templates',
    templateName,
  );

  // 2. Dosyayı oku (String olarak)
  const templateSource = await fs.readFile(templatePath, 'utf-8');

  // 3. Handlebars ile derle
  const template = handlebars.compile(templateSource);

  // 4. Verileri (name, link) HTML'in içine göm ve sonucu döndür
  return template(data);
};
