const fs = require('fs');
const path = require('path');

function scanDirectory(directory, indent = '') {
    try {
        const items = fs.readdirSync(directory);

        items.forEach(item => {
            const fullPath = path.join(directory, item);
            const stats = fs.statSync(fullPath);

            if (stats.isDirectory()) {
                console.log(`${indent}📁 ${item}/`);
                scanDirectory(fullPath, indent + '  ');
            } else {
                console.log(`${indent}📄 ${item}`);
            }
        });
    } catch (error) {
        console.log(`${indent}❌ Ошибка чтения директории: ${directory}`);
    }
}

// Запускаем сканирование с корневой директории assets/images
const rootDir = './assets/images';
console.log(`\n🔍 Сканирую структуру: ${rootDir}/\n`);

if (fs.existsSync(rootDir)) {
    scanDirectory(rootDir);
} else {
    console.log('❌ Директория assets/images не найдена!');
}
