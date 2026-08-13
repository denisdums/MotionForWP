# Audit et refactorisation 2026

## Périmètre

L'audit couvre le bootstrap, l'architecture PHP, la Settings API, REST, les blocs, les assets, le runtime d'animation, l'interface d'administration, la sécurité, les performances et l'outillage. La référence primaire est le WordPress Plugin Handbook.

## Constats traités

| Priorité | Constat | Correction |
|---|---|---|
| Haute | Les réglages étaient lus et normalisés séparément dans les assets et REST. | `Settings\Options` fournit désormais un contrat unique à l'admin, REST et JavaScript. |
| Haute | L'extension Gutenberg ajoutait ses attributs et son UI à tous les types de blocs sans garde. | Une règle d'éligibilité exclut les blocs dynamiques et incompatibles, tout en proposant des filtres PHP et JavaScript documentés. Les attributs existants restent sérialisés sans migration. |
| Haute | Des nombres issus des attributs HTML pouvaient atteindre le moteur d'animation sans validation. | Durée, délai et marge sont convertis et bornés dans le navigateur comme dans la Settings API. |
| Moyenne | Le compteur tentait d'animer des contenus non numériques et ignorait la réduction des animations. | Validation du nombre et respect de `prefers-reduced-motion`. |
| Moyenne | Les imports `@wordpress/*` pouvaient être embarqués dans le bundle Mix. | Les packages du cœur sont déclarés externes afin de ne pas dupliquer les dépendances déjà fournies par WordPress. |
| Moyenne | Le panneau Motion dupliquait des sections, exposait toutes les options et utilisait une hiérarchie d'actions peu claire. | Une section unique utilise les composants natifs, masque les propriétés facultatives, distingue la relance du bloc de celle de la vignette et conserve les états actifs avec les coches WordPress. |
| Moyenne | Aucun contrôle PHP reproductible n'était fourni après le retrait de Composer runtime. | Composer est limité au développement avec WPCS, PHPCS et PHPUnit ; `vendor/` est exclu de la distribution. |
| Moyenne | Les fichiers de développement n'étaient pas formellement exclus du ZIP. | Le champ `files` de `package.json` définit explicitement le contenu de release utilisé par `wp-scripts plugin-zip`. |

## Compatibilité préservée

- option `motion_for_wp` et sa structure ;
- routes publiques `motion-for-wp/v1/animations`, `easings` et `options` ;
- hooks historiques contenant `/` ;
- handles de scripts et styles de la refactorisation en cours ;
- bloc `motion-for-wp/motion-counter` ;
- attributs de blocs `motion`, `duration`, `delay`, `easing` et `margin` ;
- attributs HTML `data-motion-*`.

Les routes REST ne sont plus nécessaires au code interne, mais restent enregistrées car elles constituaient déjà une API publique du plugin.

## Risques et suite recommandée

1. Ajouter des tests d'intégration WordPress pour la Settings API, REST et l'enregistrement du bloc.
2. Tester manuellement l'éditeur avec des blocs statiques, dynamiques, imbriqués et verrouillés.
3. Ajouter un test end-to-end couvrant sélection, sauvegarde, rechargement et reset d'une animation.
4. Maintenir la chaîne unifiée `@wordpress/scripts` et les métadonnées `.asset.php`; Laravel Mix a été retiré après validation des bundles produits.
5. Mesurer le chargement frontend conditionnel avant de décider s'il est sûr de ne plus charger le runtime sur les pages sans `data-motion`.
