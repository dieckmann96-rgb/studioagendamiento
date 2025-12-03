// Este script Node.js injeta as variáveis de ambiente do Vercel no arquivo index.html.
// Ele é executado pelo Vercel via 'npm run build' (forçado pelo vercel.json).

const fs = require('fs');
const path = require('path');

const indexFilePath = path.join(__dirname, 'index.html');

try {
    console.log(`Buscando arquivo: ${indexFilePath}`);
    let content = fs.readFileSync(indexFilePath, 'utf8');

    // Variáveis de ambiente
    // O valor deve ser a string codificada em Base64
    const firebaseConfig = process.env.FIREBASE_CONFIG || '__CONFIG_ERROR__';
    const adminSecret = process.env.ADMIN_SECRET || '__SECRET_ERROR__';

    console.log(`Substituindo FIREBASE_CONFIG (Comprimento: ${firebaseConfig.length})...`);
    console.log(`Substituindo ADMIN_SECRET (Comprimento: ${adminSecret.length})...`);
    
    // Realiza as substituições dos placeholders
    content = content.replace('__FIREBASE_CONFIG__', firebaseConfig);
    content = content.replace('__ADMIN_SECRET__', adminSecret);

    // Salva o arquivo modificado, sobrescrevendo o original
    fs.writeFileSync(indexFilePath, content, 'utf8');

    console.log('✅ Variáveis de ambiente injetadas com sucesso no index.html.');
} catch (error) {
    console.error('❌ ERRO CRÍTICO DURANTE A INJEÇÃO DE VARIÁVEIS:', error.message);
    process.exit(1); 
}

