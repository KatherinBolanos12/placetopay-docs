const SwaggerParser = require('@apidevtools/swagger-parser');
const fs = require('fs');
const path = require('path');

const API_REFS = {
    checkout: {
        es: 'checkout/es.yaml',
        en: 'checkout/en.yaml'
    },
    gateway: {
        es: 'gateway/es.yaml',
        en: 'gateway/en.yaml'
    },
};

const generateApiRefs = async () => {
    let str = '';
    await new Promise((resolve) => {
        const refs = Object.entries(API_REFS);
        refs.forEach(async ([namespace, localesPath], idx) => {
            const elements = Object.entries(localesPath);
            await new Promise((res) => {
                elements.forEach(async ([locale, fileName], index) => {
                    const filePath = path.join(process.cwd(), 'src', 'assets', 'apis', fileName)

                    if (!fs.existsSync(filePath)) {
                        throw new Error(`File with OpenAPI structure ${filePath} does not exist`)
                    }

                    const api = await SwaggerParser.dereference(filePath);
                    str += `export const ${namespace.toUpperCase()}_${locale.toUpperCase()}_API = ${JSON.stringify(api)};\n`;
                    if (index === elements.length - 1) {
                        res();
                    }
                });
            });

            if (idx === refs.length - 1) {
                resolve();
            }
        });
    });

    str += 'const DEFAULT_VALUE = {\n';
    Object.entries(API_REFS).forEach(([namespace], idx) => {
        str += `  ${namespace.toUpperCase()}_ES_API,\n`;
        str += `  ${namespace.toUpperCase()}_EN_API,\n`;
    });
    str += '};\n';

    str += 'export default DEFAULT_VALUE;\n';

    fs.writeFileSync(path.join(process.cwd(), 'src', 'constants', 'apiRefs.js'), str);
}

generateApiRefs()