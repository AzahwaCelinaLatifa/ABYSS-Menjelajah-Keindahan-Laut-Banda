import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const assetsDir = './src/assets'; 

console.log(`\n Memulai Konversi...`);

async function mulaiKonversi() {
  if (!fs.existsSync(assetsDir)) {
    console.error(` ERROR: Folder ${assetsDir} tidak ditemukan!`);
    return;
  }

  async function processDirectory(directory) {
    const files = fs.readdirSync(directory);
    
    for (const file of files) {
      const fullPath = path.join(directory, file);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        await processDirectory(fullPath);
      } else if (path.extname(fullPath).toLowerCase() === '.svg') {
        const outputFile = fullPath.replace(/\.svg$/i, '.webp');
        
        try {
          await sharp(fullPath, { 
            density: 450 // Resolusi tinggi tapi tidak berlebihan (Sweet Spot)
          })
          .resize(1600, null, { 
            withoutEnlargement: true, // Jangan paksa gambar kecil jadi besar
            fit: 'inside' 
          })
          .webp({ 
            quality: 75,      // Kualitas 75 adalah standar emas WebP (Kecil tapi Jernih)
            effort: 6,        // Kompresi paling lambat tapi hasilnya paling kecil (Maksimal)
            smartSubsample: true 
          })
          .toFile(outputFile);

          const sizeKB = (fs.statSync(outputFile).size / 1024).toFixed(2);
          console.log(` BERHASIL: ${file} -> ${sizeKB} KB`);
        } catch (err) {
          console.error(` GAGAL: ${file} ->`, err.message);
        }
      }
    }
  }

  await processDirectory(assetsDir);
  console.log(`\n SELESAI! Ukuran file sekarang jauh lebih ideal.`);
  console.log(` Jangan lupa tekan CTRL + F5 di browser untuk melihat hasilnya.`);
}

mulaiKonversi();