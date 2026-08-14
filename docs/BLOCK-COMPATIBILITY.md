# Compatibilité des blocs Gutenberg

## Règle d'éligibilité

MotionForWP ajoute ses attributs et ses contrôles uniquement lorsqu'un bloc :

1. possède un nom enregistré ;
2. expose une fonction `save`, donc un élément racine sérialisé pouvant recevoir les attributs `data-motion-*` ;
3. n'appartient pas à la liste d'exclusion ;
4. n'est pas refusé par le filtre JavaScript d'éligibilité.

Les blocs dynamiques restent toujours exclus. Leur rendu PHP ne passe pas par `blocks.getSaveContent.extraProps` et ne garantit donc pas que les attributs Motion atteignent un élément racine. Leur prise en charge devra passer par une intégration de rendu dédiée, et non par une activation forcée du contrôle actuel.

## Liste d'exclusion PHP

Le filtre PHP suivant permet de modifier les blocs statiques exclus avant que la configuration soit transmise à l'éditeur :

```php
add_filter(
	'motion_for_wp/excluded_blocks',
	static function ( array $blocks ): array {
		$blocks[] = 'vendor/special-block';
		return $blocks;
	}
);
```

Valeurs exclues par défaut : `core/freeform`, `core/html`, `core/legacy-widget`, `core/missing`, `core/shortcode` et `core/widget-area`.

## Filtre JavaScript

Un bloc statique tiers peut affiner la décision après son enregistrement :

```js
import { addFilter } from '@wordpress/hooks';

addFilter(
	'motionForWP.isBlockSupported',
	'vendor/plugin-motion-support',
	( isSupported, blockName, settings ) => {
		if ( blockName === 'vendor/special-block' ) {
			return false;
		}
		return isSupported;
	}
);
```

Le filtre reçoit la décision par défaut, le nom du bloc et ses réglages enregistrés. Retourner `true` ne peut pas rendre un bloc dynamique éligible.

## Rétrocompatibilité

Les noms et valeurs des attributs `motion`, `duration`, `delay`, `easing` et `margin` sont inchangés. Les propriétés HTML `data-motion-*` sont également conservées. Aucun contenu statique déjà sauvegardé n'a besoin de migration.

## Interactions par type de bloc

Les interactions sont indépendantes des animations d'apparition. MotionForWP propose par défaut `magnetic-pull` pour `core/button`. Le bouton peut donc utiliser cet effet seul ou le cumuler avec une animation d'entrée.

Le filtre JavaScript suivant permet à une intégration d'exposer une interaction sur un autre bloc statique compatible :

```js
addFilter(
	'motionForWP.blockInteractions',
	'vendor/plugin-interactions',
	( interactions, blockName ) => {
		if ( blockName === 'vendor/call-to-action' ) {
			return [
				...interactions,
				{ label: 'Magnetic pull', value: 'magnetic-pull' },
			];
		}
		return interactions;
	}
);
```

L'attribut sérialisé `motionInteraction` vaut `none` par défaut. Une valeur inconnue n'est jamais rendue dans le HTML. L'effet magnétique est désactivé pour les pointeurs tactiles et lorsque la réduction des animations est active.
