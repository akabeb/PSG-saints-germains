# Le Comptoir des Saints-Pères — Application Web (`Next.js 15` + `Sanity`)

Site vitrine multilingue (`FR` · `EN` · `ES` · `IT` · `DE`) du bistrot **Le Comptoir des Saints-Pères** (29 Rue des Saints-Pères, 75006 Paris).

## Démarrage rapide

```bash
cd web
cp .env.example .env.local
npm install
npm run dev
```

Application disponible sur `http://localhost:3000` (redirige vers `/fr`).

## Scripts principaux

| Commande | Description |
|---|---|
| `npm run dev` | Serveur de développement Next.js |
| `npm run build` | Build de production (vérification TypeScript + génération statique/ISR) |
| `npm run lint` | Vérification ESLint |
| `npm run studio` | Lance Sanity Studio en local sur `http://localhost:3333` |
| `npx sanity deploy` | Publie Sanity Studio en ligne pour l'équipe du restaurant |
| `npm run seed` | Synchronise `siteSettings` et la carte complète (`FR` · `EN` · `ES` · `IT` · `DE`) dans Sanity via votre session CLI (`sanity exec scripts/seed-cli.ts --with-user-token`) |

## Gestion de la carte & des prix dans Sanity

Dans Sanity Studio (`schemaTypes/menuCategory.ts`), les **choix/prix** sont strictement séparés des **traductions** :
- **Onglet « Carte & Prix » (par défaut)** : chaque plat ou boisson possède un **seul champ `price` partagé** entre les 5 langues (`FR`, `EN`, `ES`, `IT`, `DE`). Les unités éventuelles (`les 6 / les 12`, `1 boule / 2 boules`, `Bouteille`, `Sirop`) et les tarifs mentionnés dans les sous-titres (`Sans alcool — 7.4€`, etc.) sont localisés automatiquement à l'affichage.
- **Section repliée / Onglet « Traductions (`EN · ES · IT · DE`) »** : les intitulés et compositions traduits sont rangés dans un bloc replié par défaut afin de ne jamais encombrer la mise à jour quotidienne des tarifs.

## Architecture des routes

- `/[locale]` (`fr`, `en`, `es`, `it`, `de`) — Page d'accueil (Hero actionnable, Carte complète, Histoire, Contact & Horaires 7j/7 + JSON-LD `Restaurant`)
- `/[locale]/la-carte` — Carte dédiée (cuisine & boissons, mentions réglementaires CHR)
- `/[locale]/infos-pratiques` — Horaires 7j/7, coordonnées cliquables, accès métros et carte OpenStreetMap
- `/[locale]/contact` — Accueil sans réservation, contact groupes (appel, e-mail, formulaire Formspree optionnel) et plan d'accès
- `/[locale]/mentions-legales` — Mentions légales LCEN, hébergeur, RGPD et informations réglementaires
- `/sitemap.xml` & `/robots.txt` — Plan du site multilingue (`hreflang` sur les 5 langues + `x-default`) et directives d'indexation
