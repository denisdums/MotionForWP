# Conformité au WordPress Plugin Handbook

Ce document est normatif pour tous les plugins. La référence primaire est le [WordPress Plugin Handbook](https://developer.wordpress.org/plugins/).

## Ordre de décision obligatoire

Pour chaque fonctionnalité, l'agent doit suivre cet ordre :

1. identifier l'API WordPress correspondant au besoin ;
2. utiliser ses fonctions, hooks, composants, conventions et contrôles natifs ;
3. conserver l'UX existante lorsque l'API native permet le même parcours ;
4. n'ajouter une abstraction que si elle isole une règle métier ou plusieurs usages ;
5. documenter toute exception avant d'implémenter une solution personnalisée.

« Plus moderne » ou « plus flexible » ne suffit pas à justifier le remplacement d'une API WordPress.

## Correspondances attendues

| Besoin | API ou composant WordPress prioritaire |
|---|---|
| Page d'administration | `add_menu_page()`, `add_submenu_page()`, `add_options_page()` |
| Réglages simples | Settings API et Options API |
| Formulaire d'action métier | `admin-post.php`, capacité, nonce et redirection sûre |
| Message utilisateur | `WP_Error`, `add_settings_error()`, `settings_errors()` ou notice admin native |
| Tableau administratif | `widefat`, `striped`, listes natives si la volumétrie le requiert |
| Navigation de page | `nav-tab-wrapper`, `nav-tab`, URLs et état actif accessibles |
| Panneau | `postbox`, `postbox-header`, `inside` |
| Action | `button`, `button-primary`, `button-secondary`, `submit_button()` |
| Métadonnée de contenu | Metadata API |
| Type de contenu ou taxonomie | APIs d'enregistrement WordPress |
| Éditeur de blocs | packages `@wordpress/*`, SlotFills et composants Gutenberg |
| Endpoint HTTP interne | REST API avec permissions, validation, schéma et réponse WordPress |
| Requête distante | HTTP API, jamais cURL direct |
| Cache | Transients ou Object Cache API |
| Tâche planifiée | WP-Cron avec désinscription à la désactivation |
| Fichiers | Filesystem API lorsque WordPress doit écrire sur le système |
| Traduction | fonctions i18n WordPress et domaine littéral |
| Désinstallation | `uninstall.php` ou hook, uniquement pour la suppression intentionnelle |

## UI et préservation de l'UX

La migration vers les composants WordPress ne doit pas déplacer les fonctions, renommer les actions, supprimer des informations, modifier les permissions ou rallonger les parcours sans décision produit explicite.

Le design system partagé :

- compose les classes WordPress au lieu de les imiter ;
- ajoute une marque par variables CSS limitées à `.plugin-admin` ;
- ne modifie pas le comportement d'un composant natif ;
- conserve le focus, les états désactivés, le responsive et les contrastes du cœur ;
- laisse l'interface utilisable si le thème ne se charge pas.

## Sécurité

À chaque entrée :

1. vérifier une capacité adaptée ;
2. vérifier un nonce pour toute action ayant un effet ;
3. valider le type, la structure et les valeurs admises ;
4. nettoyer avant stockage ou traitement ;
5. utiliser l'API WordPress de persistance ou d'accès adaptée ;
6. échapper tardivement selon le contexte de sortie ;
7. retourner ou afficher les erreurs avec les mécanismes WordPress.

Un nonce ne remplace jamais un contrôle de capacité.

## Hooks et extensibilité

Les hooks sont enregistrés au moment WordPress approprié. Les callbacks d'action effectuent une action ; les filtres retournent toujours une valeur. Tout hook public est préfixé, documenté et considéré comme une API de compatibilité.

Ne pas utiliser un hook générique lorsqu'un hook plus ciblé évite du travail ou le chargement d'assets inutile.

## Internationalisation

Tout texte visible est traduisible. Le texte source est en anglais, son domaine est un littéral stable et les variables utilisent des placeholders. Le JavaScript utilise les packages i18n WordPress et charge ses traductions avec `wp_set_script_translations()`.

## Exceptions documentées

Une solution personnalisée est autorisée si :

- WordPress ne fournit aucune API adaptée ;
- l'API native empêcherait une fonction essentielle ;
- une donnée métier ne correspond pas à une option ou métadonnée WordPress ;
- une contrainte de compatibilité impose temporairement l'ancien mécanisme.

Chaque exception indique la raison, les alternatives rejetées, l'impact sécurité/accessibilité et la condition de réévaluation.

## Revue obligatoire

Avant livraison, vérifier au minimum :

- APIs natives réellement utilisées ;
- capacités et nonces ;
- validation, nettoyage et échappement ;
- chargement contextuel des assets ;
- traduction des textes visibles ;
- hooks publics et données persistées ;
- activation, mise à jour, désactivation et désinstallation ;
- fonctionnement avec le thème de marque désactivé ;
- absence de régression du parcours utilisateur.

## Références officielles

- [Plugin Handbook](https://developer.wordpress.org/plugins/)
- [Best Practices](https://developer.wordpress.org/plugins/plugin-basics/best-practices/)
- [Settings API](https://developer.wordpress.org/plugins/settings/settings-api/)
- [Plugin Security](https://developer.wordpress.org/plugins/security/)
- [Hooks](https://developer.wordpress.org/plugins/hooks/)
- [Activation and deactivation](https://developer.wordpress.org/plugins/plugin-basics/activation-deactivation-hooks/)
- [Internationalization](https://developer.wordpress.org/plugins/internationalization/how-to-internationalize-your-plugin/)
