// Este script Node.js injeta as variáveis de ambiente do Vercel no arquivo index.html.

const fs = require('fs');
const path = require('path');

const indexFilePath = path.join(__dirname, 'index.html');

try {
    let content = fs.readFileSync(indexFilePath, 'utf8');

    // As variáveis de ambiente do Vercel (FIREBASE_CONFIG e ADMIN_SECRET)
    // vêm do 'process.env'
    
    // O Vercel injeta a configuração do Firebase como uma string JSON.
    const firebaseConfig = process.env.FIREBASE_CONFIG || '{"error": "Configuração não carregada."}';
    
    // O Vercel injeta o segredo de administrador.
    const adminSecret = process.env.ADMIN_SECRET || 'ERROR_SECRET';

    // Realiza as substituições dos placeholders no HTML
    content = content.replace('__FIREBASE_CONFIG__', firebaseConfig);
    content = content.replace('__ADMIN_SECRET__', adminSecret);

    // Salva o arquivo index.html modificado
    fs.writeFileSync(indexFilePath, content, 'utf8');

    console.log('✅ Variáveis de ambiente injetadas com sucesso no index.html.');
} catch (error) {
    console.error('❌ Erro durante a injeção das variáveis:', error.message);
    // Falha na implantação se o script falhar
    process.exit(1); 
}

