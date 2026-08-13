# Compilation des assets

Motion for WP utilise uniquement `@wordpress/scripts`. Laravel Mix et `npm-run-all` ne font plus partie de la chaîne de compilation.

Le projet cible Node.js 24 LTS via `.nvmrc`, avec Node.js 20 ou supérieur et npm 10 ou supérieur comme contraintes déclarées. Utiliser une version LTS de Node, conformément à la recommandation du Block Editor Handbook.

## Commandes

```bash
nvm use
npm install
npm run start
npm run assets:start
npm run build
npm run lint:js
npm run lint:css
npm run plugin-zip
```

- `npm run start` surveille les sources des blocs Gutenberg ;
- `npm run assets:start` surveille le runtime frontend et l'extension de l'éditeur ;
- `npm run build` reconstruit successivement les assets généraux puis les blocs ;
- `npm run plugin-zip` produit l'archive distribuable à partir de la liste blanche `files` de `package.json`.

## Sorties contractuelles

| Source | Sortie |
|---|---|
| `resources/js/app.js` | `dist/js/app.js` et `dist/js/app.asset.php` |
| `resources/js/admin.js` | `dist/js/admin.js` et `dist/js/admin.asset.php` |
| `resources/scss/front.scss` | `dist/css/front.css` |
| `resources/blocks/*` | `dist/blocks/*` |

Le PHP lit les fichiers `.asset.php` générés pour utiliser les dépendances et versions calculées par WordPress Scripts. Les packages `@wordpress/*` restent fournis par WordPress Core et ne sont pas dupliqués dans le bundle admin.

Toutes les dépendances npm sont des dépendances de développement : l'archive WordPress distribue uniquement les artefacts compilés et n'embarque jamais `node_modules/`. Un `npm audit --omit=dev` doit donc retourner zéro dépendance de production installée.
