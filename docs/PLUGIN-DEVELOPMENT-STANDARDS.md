# Standard de développement des plugins WordPress

Ce document est la référence pour Motion for WP et les autres plugins du même auteur. Il est écrit pour être suivi autant par des développeurs que par des agents IA.

## 1. Principes directeurs

1. **WordPress d’abord.** Utiliser les APIs du cœur avant d’introduire une abstraction ou une bibliothèque.
2. **Architecture proportionnée.** Une couche n’existe que si elle isole une responsabilité réelle ou possède plusieurs consommateurs.
3. **Bootstrap sans logique métier.** Le fichier principal ne contient que l’en-tête, la protection d’accès direct, les constantes, l’autoload et le démarrage.
4. **Hooks visibles.** Chaque fonctionnalité est un service dont la méthode `register()` déclare ses hooks WordPress.
5. **Entrées non fiables, sorties échappées.** Valider puis nettoyer à l’entrée, contrôler les capacités, utiliser les nonces pour les écritures et échapper au dernier moment.
6. **Compatibilité publique intentionnelle.** Les hooks, options, routes, handles, noms de blocs et attributs sérialisés sont des APIs publiques.
7. **Performance par contexte.** Ne charger et ne calculer que ce qui est utile à la requête courante.
8. **Le build est reproductible.** Les sources sont éditées, `dist/` est généré, et une commande unique produit la version distribuable.

## 2. Arborescence de référence

```text
plugin-slug/
├── plugin-slug.php              # Bootstrap uniquement
├── AGENTS.md                    # Règles courtes pour les agents
├── README.txt                   # Métadonnées WordPress.org
├── docs/
│   └── PLUGIN-DEVELOPMENT-STANDARDS.md
├── src/
│   ├── Plugin.php               # Composition des services
│   ├── Contracts/Service.php    # Contrat minimal register()
│   ├── Admin/                   # Pages et comportements wp-admin
│   ├── Content/                 # Accès aux données métier
│   ├── Rest/                    # Contrôleurs REST, seulement si utiles
│   └── ...                      # Responsabilités métier explicites
├── resources/
│   ├── blocks/                  # Sources des blocs
│   ├── js/
│   ├── scss/
│   └── data/                    # Données sources versionnées
├── dist/                        # Artefacts compilés distribuables
├── languages/
└── tests/
    ├── Unit/
    └── Integration/
```

Ne pas créer par défaut des dossiers `Helpers`, `Managers`, `Utils`, `Core` ou `Includes`. Leur nom masque généralement une responsabilité. Préférer `Content/Catalog`, `Admin/Settings_Page` ou `Rest/Animations_Controller`.

## 3. Bootstrap et cycle de vie

Le fichier principal doit :

- déclarer l’en-tête WordPress et un `@package` stable ;
- arrêter l’exécution si `ABSPATH` n’est pas défini ;
- déclarer la version, le fichier, le chemin et l’URL du plugin ;
- enregistrer un autoload limité au namespace du plugin ;
- appeler `Plugin::boot()` ;
- ne déclarer aucune classe globale et ne pas exécuter de logique métier.

`Plugin::boot()` compose explicitement les dépendances et enregistre une liste de services. Éviter le service locator, les singletons et les propriétés statiques mutables : ils cachent les dépendances et compliquent les tests.

Ajouter des hooks d’activation, de désactivation ou un `uninstall.php` uniquement lorsqu’une action concrète est nécessaire. Une désactivation ne doit généralement pas supprimer les données ; une désinstallation peut le faire si ce comportement est clairement documenté.

## 4. PHP et conventions WordPress

- Suivre les WordPress Coding Standards pour les espaces, tableaux, noms de méthodes en `snake_case`, documentation, sécurité et internationalisation.
- Utiliser un namespace unique, par exemple `Vendor\PluginName`.
- Utiliser une classe par fichier et des noms de classes explicites.
- Les classes sans vocation d’héritage sont `final`.
- Les méthodes et propriétés ont toujours une visibilité.
- Les types PHP sont permis lorsqu’ils respectent la version minimale annoncée.
- Une dépendance est reçue par le constructeur ; elle n’est pas récupérée depuis une globale.
- Les callbacks publics connectés aux hooks gardent des signatures compatibles avec WordPress.

Le projet utilise des chemins PSR-4 sous `src/` avec un autoload local. C’est un choix conscient : il garde le namespace et l’arborescence alignés sans imposer Composer. Les règles WordPress de sécurité, d’interopérabilité et de style restent obligatoires.

### Quand utiliser Composer

Composer n’est pas requis pour charger les seules classes du plugin. L’ajouter uniquement si au moins une condition est vraie :

- une dépendance PHP de production doit être versionnée et distribuée ;
- des outils PHP de développement (`phpcs`, analyse statique, tests) sont réellement intégrés au workflow ;
- le projet est assez vaste pour que l’autoload généré apporte un bénéfice mesurable.

Si Composer est ajouté, séparer `require` et `require-dev`, verrouiller les versions, préfixer les dépendances distribuées si un conflit global est possible, et définir clairement si `vendor/` appartient à l’archive publiée.

## 5. Services et hooks

Un service représente une capacité WordPress cohérente : blocs, assets, réglages, REST, tâches planifiées, etc. Sa méthode `register()` ne fait qu’attacher actions et filtres. La logique est exécutée dans les callbacks au bon moment du cycle WordPress.

Règles :

- `init` pour enregistrer les blocs et types de contenus ;
- `admin_init` pour les réglages ;
- `admin_menu` pour les pages d’administration ;
- `enqueue_block_editor_assets` pour une extension de l’éditeur ;
- `wp_enqueue_scripts` pour le frontend ;
- `rest_api_init` pour les routes REST ;
- documenter chaque hook public avec ses paramètres ;
- préfixer tous les hooks, options, handles et identifiants avec le slug du plugin.

Ne pas ajouter une route REST pour des données uniquement consommées par un script déjà rendu par PHP. Injecter une configuration JSON minimale au script concerné. Une route est justifiée lorsqu’un client réalise réellement des requêtes indépendantes.

## 6. Données, options et fichiers

- Centraliser l’accès à une même source de données dans un repository métier explicite.
- Vérifier `is_readable()` et les retours de `file_get_contents()`.
- Vérifier le type issu de `json_decode()` et revenir à une valeur neutre.
- Utiliser `array_replace()` pour des catalogues indexés par slug lorsque la configuration aval doit remplacer une entrée amont.
- Donner aux options une structure stable et des valeurs par défaut.
- Enregistrer les options avec la Settings API.
- Valider les valeurs par liste blanche ou intervalle, puis les nettoyer.
- Ne jamais transmettre directement `$_POST`, `$_GET`, `$_REQUEST` ou `$_FILES` à un hook métier.

Toute modification du nom ou de la structure d’une option persistée nécessite une migration versionnée et idempotente.

## 7. Administration

Les pages simples utilisent la Settings API et les composants visuels natifs de WordPress. Une UI personnalisée n’est justifiée que par un besoin produit réel.

- capacité `manage_options` par défaut pour les réglages globaux ;
- contrôle de capacité dans le menu **et** dans le rendu ou le traitement ;
- `settings_fields()`, `do_settings_sections()` et `submit_button()` pour un formulaire standard ;
- `settings_errors()` pour le feedback ;
- pas de CSS/JS chargé sur toutes les pages d’administration ;
- textes traduisibles avec un domaine constant en littéral pour les outils d’extraction ;
- attributs avec `esc_attr()`, texte avec `esc_html()`, URLs avec `esc_url()`, HTML autorisé avec `wp_kses_post()`.

### Design system partagé

Les plugins utilisent le socle canonique `WPSandBox/wordpress-admin-design-system`. Une interface doit commencer par les composants natifs WordPress (`wrap`, `nav-tab-wrapper`, `notice`, `postbox`, `form-table`, `widefat`, `button`) puis appliquer les classes structurelles `plugin-admin__*`. Chaque plugin embarque sa copie du socle et un thème limité à ses tokens de marque afin de rester autonome.

Ne jamais réinitialiser ou redéfinir globalement `:root`, `.wrap`, `.button`, `.notice` ou les champs WordPress. Tous les styles doivent être limités à `.plugin-admin`. Une page doit rester lisible et fonctionnelle lorsque la couche de marque ne se charge pas.

## 8. Blocs Gutenberg

`block.json` est la source canonique côté PHP et JavaScript. Les blocs sont compilés sous `dist/blocks/<nom>/` et enregistrés côté serveur depuis leurs métadonnées.

- utiliser le schéma officiel dans `$schema` ;
- utiliser Block API v3 pour un minimum WordPress 6.3 ou supérieur ;
- conserver un namespace et des noms de blocs stables, car ils sont sérialisés dans le contenu ;
- utiliser `useBlockProps()` et `useBlockProps.save()` sur l’élément racine ;
- déclarer scripts et styles dans `block.json` afin de profiter du chargement contextuel ;
- ne pas modifier un attribut sauvegardé sans dépréciation/migration du bloc ;
- tester l’éditeur dans son iframe et le frontend ;
- prévoir le comportement sans JavaScript et avec `prefers-reduced-motion`.

Les extensions globales de blocs via filtres JavaScript doivent éviter de modifier les blocs incompatibles (blocs dynamiques, navigation, widgets, etc.) et posséder une liste d’inclusion/exclusion testée.

## 9. Assets et JavaScript

- Un handle décrit une responsabilité : `plugin-slug`, `plugin-slug-editor`, `plugin-slug-settings`.
- Déclarer toutes les dépendances WordPress du bundle ou exploiter un fichier `.asset.php` généré.
- Utiliser un hash de build ou `filemtime()` comme version en développement/distribution locale.
- Charger l’éditeur via `enqueue_block_editor_assets`, jamais via `admin_enqueue_scripts` global.
- Utiliser `wp_add_inline_script()` pour une configuration structurée ; réserver `wp_localize_script()` aux chaînes localisées historiques.
- Exposer un seul objet global immuable et préfixé si un passage de données PHP vers JS est requis.
- Garder les sélecteurs DOM et attributs `data-*` préfixés.
- Respecter `prefers-reduced-motion` et éviter de cacher le contenu lorsque JS échoue.
- Les commandes de build séquentielles utilisent `&&`. Le parallélisme de développement doit être géré par un outil qui propage correctement les codes de sortie.

Ne jamais éditer `dist/` manuellement. Modifier `resources/`, exécuter le build, puis versionner les artefacts si le plugin doit être installable directement depuis Git.

## 10. REST API

Chaque contrôleur REST possède un namespace versionné et une responsabilité. Toute route doit définir :

- une méthode HTTP explicite (`WP_REST_Server::READABLE`, etc.) ;
- un `permission_callback` fondé sur une capacité, ou `__return_true` si la ressource est intentionnellement publique ;
- des arguments avec validation et nettoyage ;
- un schéma de réponse lorsque l’API est publique ;
- un retour via `rest_ensure_response()` ou `WP_Error`.

Les callbacks lisent, créent, mettent à jour ou suppriment une ressource ; ils ne mélangent pas ces responsabilités.

## 11. Sécurité et confidentialité

Checklist obligatoire pour chaque point d’entrée :

1. Qui peut exécuter l’action ? Vérifier une capacité, pas seulement la connexion.
2. L’action écrit-elle ? Vérifier un nonce adapté.
3. Quelle forme de donnée est valide ? Valider type, intervalle, format ou liste blanche.
4. Comment la stocker ? Nettoyer avec la fonction WordPress adaptée.
5. Où est-elle rendue ? Échapper selon le contexte au dernier moment.
6. Contient-elle des données personnelles ? Documenter rétention, export et effacement si nécessaire.

Ne pas masquer les erreurs avec `@`, ne pas faire confiance aux fichiers du thème, ne pas construire de SQL sans `$wpdb->prepare()`, et utiliser l’HTTP API au lieu de cURL direct.

## 12. Qualité, tests et livraison

Le minimum avant livraison :

```bash
find . -type f -name '*.php' -not -path './node_modules/*' -print0 | xargs -0 -n1 php -l
npm run lint:js
npm run lint:css
npm run build
git diff --check
```

Pour un plugin maintenu à long terme, ajouter :

- PHPCS avec WordPress Coding Standards ;
- tests unitaires pour la logique pure et la validation ;
- tests d’intégration WordPress pour les hooks, options, routes et blocs ;
- tests end-to-end pour les parcours éditeur critiques ;
- une matrice sur la version WordPress minimale, la version stable actuelle et les versions PHP supportées.

Avant une release : aligner la version du header, `README.txt`, `package.json` et des métadonnées de blocs ; reconstruire `dist/` ; mettre à jour les traductions ; tester activation, désactivation, mise à jour et désinstallation ; inspecter le ZIP final pour exclure sources privées, caches et dépendances de développement.

## 13. Procédure attendue d’un agent IA

Avant toute modification :

1. lire `AGENTS.md`, ce standard, l’état Git et les fichiers concernés ;
2. identifier les APIs publiques et les données persistées affectées ;
3. formuler la responsabilité modifiée et son contexte WordPress ;
4. choisir la solution la plus petite qui respecte ce document.

Pendant la modification :

1. préserver les changements utilisateur non liés ;
2. modifier les sources, jamais les artefacts générés seuls ;
3. documenter les nouveaux hooks publics ;
4. ajouter une migration pour tout changement persistant ou sérialisé ;
5. ne pas ajouter une dépendance ou abstraction sans justification écrite.

Avant de terminer :

1. exécuter les contrôles applicables ;
2. vérifier le diff complet et les fichiers non suivis ;
3. rapporter le comportement changé, la compatibilité et les validations ;
4. signaler honnêtement tout test non exécutable.

## 14. Références officielles

- [Plugin Handbook](https://developer.wordpress.org/plugins/)
- [WordPress PHP Coding Standards](https://developer.wordpress.org/coding-standards/wordpress-coding-standards/php/)
- [Plugin security](https://developer.wordpress.org/plugins/security/)
- [Settings API](https://developer.wordpress.org/plugins/settings/settings-api/)
- [Adding REST API endpoints](https://developer.wordpress.org/rest-api/extending-the-rest-api/adding-custom-endpoints/)
- [Block metadata](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/)
- [Block API versions](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-api-versions/)
