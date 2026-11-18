# Design System — Le Comptoir des Saints-Pères

## Register & Aesthetic Direction
- **Register:** `brand` (vitrine bilingue FR/EN d'une brasserie parisienne patrimoniale à Saint-Germain-des-Prés).
- **Gabarit de référence :** Gabarit éditorial *Laurent* recalibré pour la lisibilité mobile, l'accessibilité WCAG AA (`>= 4.5:1`) et la conversion directe en bistrot (appel en 1 clic, itinéraire, consultation fluide de la carte).

## Color Tokens (`web/app/globals.css`)

| Token CSS | Hex | Usage | Contraste vérifié |
|---|---|---|---|
| `--wp-accent` / `--wp-teal` | `#005e66` | Titres de sections, intitulés et prix de la carte, boutons primaires sur fond clair | **7.52:1** sur `#ffffff` · **7.13:1** sur `#faf9f4` (AAA) |
| `--wp-panel` | `#0b1315` | Fond sombre du header, du Hero, du tiroir mobile et des pages 404/erreur | — |
| `--wp-surface` | `#ffffff` | Surface claire principale (Carte, À propos, Infos pratiques, Footer) | — |
| `--wp-warm` | `#faf9f4` | Surface crème chaude secondaire (`ContactSplit`, bandeaux d'accentuation) | — |
| `--wp-ink` | `#071214` | Corps de texte principal sur fond clair | **18.8:1** sur `#ffffff` |
| `--wp-gold` | `#c9ab81` | **Exclusivement sur fond sombre `#0b1315`** (hover navigation, badge Hero, monogramme LCSP) | **8.61:1** sur `#0b1315` (AAA) |
| `--wp-gold-dark` | `#7a5c34` | **Sur fonds clairs `#ffffff` / `#faf9f4`** (taglines script `.st-tagline`, sous-titres de carte, prix uniques) | **5.78:1** sur `#ffffff` · **5.48:1** sur `#faf9f4` (AA) |
| `--wp-field-border` | `#715b3e` | Filets d'accordéon, bordures de boutons secondaires, leaders de prix | **6.43:1** sur `#ffffff` |
| `--wp-ornament` | `#9C7C57` | Ornements géométriques décoratifs (`TitleDecor`, `ChevronGridAnimated`, `aria-hidden`) | Décoratif uniquement |

## Typography

| Rôle | Police | Variable CSS | Règles d'échelle |
|---|---|---|---|
| Titrage (`h1`–`h6`, plats, prix) | `Caviar Dreams` (`.woff2` local) | `--font-heading` | `clamp()` fluide, `uppercase`, `letter-spacing: 0.16em–0.20em`, `tabular-nums` sur les prix |
| Accroches & surtitres | `Miniver` (Google Fonts) | `--font-script` | `20px–22px`, casse naturelle, `--wp-gold` sur sombre / `--wp-gold-dark` sur clair |
| Corps éditorial & descriptions | `Arsenal` (`latin`, `latin-ext`) | `--font-body` | `15px–17px`, `max-width: 65ch`, `line-height: 1.75` |
| Navigation & boutons CTA | `Josefin Sans` (`300`, `400`) | `--font-nav` / `--font-cta` | Boutons CTA : `11px–12px`, `uppercase`, `letter-spacing: 0.24em–0.28em`, cible tactile `>= 44px` |

## Component & Accessibility Rules
1. **Zéro texte blanc nu sur photo :** Tout Hero (`Hero.tsx`, `PageHero.tsx`) superpose un dégradé `from-wp-panel/75 via-wp-panel/50 to-wp-panel/75` sous le texte.
2. **Zéro troncature des prix :** Les lignes de carte utilisent Flexbox avec retour à la ligne autorisé sur le nom du plat (`min-w-0 break-words`) et `shrink-0 whitespace-nowrap tabular-nums` uniquement sur le prix.
3. **Panneaux masqués :** Tout tiroir ou panneau d'accordéon fermé combine `invisible`, `aria-hidden="true"` et `inert` pour éviter les pièges de tabulation clavier et les fuites lecteur d'écran.
4. **Mouvement réduit :** `@media (prefers-reduced-motion: reduce)` désactive le dessin progressif des SVG et les transitions de tiroirs/soulignements.
