const {PurgeCSS} = require('purgecss');
const fs = require('fs').promises;

(async () => {
  try {
    const purgecss = await new PurgeCSS().purge({
      content: ["src/views/**/*.js"],
      css: ["src/views/**/*.css"]
    });

    await Promise.all(
      purgecss.map(async (file) => {
        await fs.writeFile(file.file, file.css);
        console.log(`${file.file} written`);
      })
    );

    console.log('All files written successfully.');
  } catch (error) {
    console.error('Error:', error);
  }
})();
