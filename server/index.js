var URL = 'http://www.world-art.ru/animation/animation.php?id=1';

const { spawn } = require('child_process');
const curl = spawn('curl', ['-o', 'json.json','-H' ,'Accept-Charset: utf-8' ,URL]);

curl.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

// /html/body/center/table[7]/tbody/tr/td/table/tbody/tr/td[5]/table[2]/tbody/tr[2]/td[3]/table[2]/tbody/tr/td[3]