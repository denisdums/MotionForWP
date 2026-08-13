# Traductions

Le domaine unique du plugin est `motion-for-wp`. Les catalogues embarqués utilisent également ce préfixe :

- `languages/motion-for-wp.pot` pour les chaînes sources ;
- `languages/motion-for-wp-fr_FR.po` et `.mo` pour PHP et les métadonnées de blocs ;
- `languages/motion-for-wp-fr_FR-<hash>.json` pour chaque bundle JavaScript distribué.

## Régénération

Après avoir modifié une chaîne PHP, JavaScript ou `block.json` :

```bash
npm run build
wp i18n make-pot . languages/motion-for-wp.pot \
  --slug=motion-for-wp \
  --domain=motion-for-wp \
  --include='motion-for-gutenberg.php,src,resources,dist' \
  --exclude='resources/animations'
msgmerge --update languages/motion-for-wp-fr_FR.po languages/motion-for-wp.pot
msgfmt --check --check-header \
  languages/motion-for-wp-fr_FR.po \
  -o languages/motion-for-wp-fr_FR.mo
wp i18n make-json languages/motion-for-wp-fr_FR.po languages --no-purge --pretty-print
```

WP-CLI doit générer un fichier dont le suffixe correspond à `md5('dist/js/admin.js')`, soit actuellement `52faef02f284ff243d6fbb9960d54759`. Les bundles minifiés peuvent parfois produire une référence source abrégée ; toujours contrôler la propriété `source` et le hash avant livraison.

Le script principal de l’éditeur charge ses catalogues avec `wp_set_script_translations()`. Les scripts déclarés dans `block.json` utilisent leur `textdomain` et les catalogues JSON associés à leur chemin compilé.

## Principes éditoriaux

- les textes sources restent en anglais ;
- les libellés de marque ne sont pas traduits ;
- les unités et descriptions sont traduites dans un français naturel ;
- les noms d’animations intégrées sont traduits côté PHP avant d’être transmis à JavaScript ;
- les animations ajoutées par un thème conservent leur libellé fourni par l’auteur.
