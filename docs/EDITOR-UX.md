# UX du panneau Motion

Le panneau repose exclusivement sur les composants de `@wordpress/components` et `@wordpress/block-editor`. Il n'ajoute aucune imitation CSS d'un contrôle WordPress.

## États

### Sans animation

Le panneau affiche uniquement la sélection d'animation et une aide courte. Aucun réglage avancé inactif ne surcharge l'inspecteur.

### Avec une animation

Le panneau « Motion » est une section unique composée avec les composants WordPress. Il conserve visible la sélection d'animation, tandis que son menu « … » est placé directement dans l'en-tête. Les réglages complémentaires — durée, délai, courbe d'accélération et marge de la zone d'affichage — sont masqués par défaut et peuvent y être ajoutés individuellement. L'aperçu illustratif est affiché après les réglages complémentaires actifs.

L’aperçu illustratif rejoue automatiquement l’animation choisie sur un repère neutre. Il utilise la durée, le délai et la courbe effectifs du bloc, y compris les valeurs globales lorsqu'aucune surcharge n'est définie. La marge de la zone d'affichage n'altère pas sa trajectoire : elle règle uniquement le seuil de déclenchement sur le frontend.

Cette petite surface visuelle est la seule exception aux contrôles Gutenberg natifs : WordPress ne fournit pas de composant d’aperçu d’animation. Le repère est masqué aux technologies d’assistance et stylé uniquement sous le préfixe `.motion-for-wp-inspector`. Un `Button` WordPress avec une icône de relance est placé sur la même ligne que le libellé « Aperçu » ; son libellé accessible est « Relancer l’aperçu ». La sélection reste un `SelectControl`, et l’interface demeure entièrement utilisable sans la couche CSS illustrative.

L'action « Rejouer l’animation » se trouve également dans ce menu, immédiatement au-dessus de « Tout réinitialiser ». Elle reste indisponible lorsque le système demande une réduction des animations.

Un réglage qui possède déjà une surcharge reste visible à l'ouverture du bloc afin qu'aucune valeur enregistrée ne soit dissimulée. Le décocher dans le menu « … » supprime uniquement sa surcharge et rétablit l'héritage du réglage global.

Chaque valeur numérique vide signifie « utiliser la valeur globale » ; la valeur globale effective apparaît dans l'aide et dans le placeholder.

La courbe propose explicitement « Utiliser le réglage global » avec le nom de la valeur effective.

### Réinitialisation

Les actions natives distinguent les intentions :

- « Tout réinitialiser », fourni par le menu « … », conserve l'animation choisie, masque les réglages complémentaires et remet durée, délai, courbe et marge sur les valeurs globales ;
- décocher un réglage dans ce même menu ne réinitialise que celui-ci ;
- choisir « Aucune animation » dans la liste retire l'animation et nettoie toutes ses surcharges.

Aucune confirmation modale n'est ajoutée : ces changements restent immédiatement annulables dans l'historique Gutenberg et ne suppriment aucune donnée externe au bloc.

## Compatibilité des contenus

L'interface traduit les états historiques pour l'affichage uniquement :

- `motion: "none"` signifie aucune animation ;
- `duration`, `delay` ou `margin` à `"0"` signifient hériter du réglage global ;
- `easing: "none"` signifie hériter de la courbe globale.

Ces valeurs sérialisées restent inchangées. Les contenus existants n'ont donc besoin d'aucune migration et le markup frontend reste identique.

## Aperçu

Deux actions ont volontairement des cibles distinctes :

- l'icône « Relancer l’aperçu », alignée avec le libellé « Aperçu », relance uniquement le repère illustratif ;
- « Rejouer l’animation », depuis le menu « … », applique temporairement l’animation uniquement au conteneur du bloc sélectionné, y compris dans l’iframe de l’éditeur.

Ces actions ne modifient aucun attribut du bloc. La vignette est également relancée automatiquement lorsqu'une animation, une durée, un délai ou une courbe change.

Une nouvelle animation temporaire du bloc annule la précédente. À la fin, à la réinitialisation ou au démontage du bloc, les styles inline présents avant l’aperçu sont restaurés. Si le système demande une réduction des animations, les deux actions sont désactivées et une notice WordPress explique pourquoi.

## Accessibilité et composants WordPress

- les options actives utilisent l'état sélectionné et la coche native de `MenuItem` ;
- les actions à icône conservent une zone cliquable WordPress et un nom accessible traduit ;
- les champs utilisent les tailles et marges recommandées pour les versions actuelles de WordPress ;
- aucune animation d'éditeur ou du frontend n'est jouée lorsque `prefers-reduced-motion: reduce` est actif ;
- les notices d'indisponibilité utilisent le composant `Notice` du cœur.

## Architecture JavaScript

- `hooks/hooks.js` ne contient que les filtres Gutenberg, les attributs sérialisés et l’injection du panneau ;
- `editor/MotionInspectorControls.js` compose l’état et les composants du panneau ;
- `editor/MotionOptionsMenu.js` porte le menu WordPress et ses actions ;
- `editor/MotionSettingControl.js` rend les contrôles selon leur type ;
- `editor/MotionAnimationPreview.js` rend l’aperçu illustratif du sélecteur ;
- `editor/use-motion-preview.js` isole le cycle de vie de l’aperçu appliqué au bloc réel ;
- `editor/runtime.js` normalise la configuration injectée par PHP et les listes traduites.
