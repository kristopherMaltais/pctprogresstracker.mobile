# Script SVG to SQL

Ce script Node.js permet de convertir un fichier SVG en requête SQL pour Supabase.

## 📋 Prérequis

- Node.js installé sur votre machine

## 🚀 Utilisation

### 1. Rendre le script exécutable (optionnel)

```bash
chmod +x scripts/svg-to-sql.js
```

### 2. Exécuter le script

```bash
node scripts/svg-to-sql.js
```

### 3. Placer votre fichier SVG

Placez votre fichier SVG dans le dossier `scripts/` (ex: `scripts/washington.svg`)

### 4. Suivre les instructions

Le script vous demandera les informations suivantes :

1. **Nom du fichier SVG** : Le nom du fichier dans le dossier scripts (ex: `washington.svg`)
2. **hikeId** : L'UUID de la randonnée (clé étrangère)
3. **Nom de la map** : Le nom de la carte
4. **Distance totale** : La distance totale en format numérique
5. **Orientation** : `portrait` ou `landscape`
6. **Description EN** : Description en anglais (optionnel)
7. **Description FR** : Description en français (optionnel)

### 5. Résultat

Le script génère :

- Un fichier `.sql` dans le dossier `scripts/`
- Affiche la requête SQL dans la console

## 📝 Format du SVG

Le script s'attend à un SVG avec :

- **Attributs `width` et `height`** dans la balise `<svg>`
- **Un path principal** avec `stroke-width="3"` (le tracé de la randonnée)
- **Des paths de décoration** (tous les autres paths)

### Exemple de SVG valide :

```xml
<svg width="200" height="150" viewBox="0 0 200 150" fill="none">
  <!-- Path principal (le tracé) -->
  <path d="M61.39..." stroke="#FC5200" stroke-width="3"/>

  <!-- Décorations -->
  <path d="M4.334..." stroke="white"/>
  <path d="M72.77..." fill="white"/>
</svg>
```

## 🗄️ Structure de la base de données

### Table `maps`

- `width` (int)
- `height` (int)
- `orientation` (text)
- `path` (text)
- `hikeId` (uuid, clé étrangère)
- `name` (text)
- `totalDistance` (numeric)
- `descriptionEN` (text)
- `descriptionFR` (text)

### Table `decorations`

- `id` (uuid, clé primaire)
- `decoration` (text, unique)

### Table `map_decoration` (many-to-many)

- `mapId` (uuid)
- `decorationId` (uuid)

## ⚠️ Important

Après avoir exécuté la requête SQL dans Supabase :

1. Notez l'ID de la map créée
2. Remplacez `<map_id>` dans les requêtes de liaison des décorations par cet ID
3. Exécutez les requêtes de liaison

## 📦 Exemple complet

```bash
$ node scripts/svg-to-sql.js
=== Générateur de requête SQL pour Maps ===

Nom du fichier SVG (ex: washington.svg): washington.svg
✅ SVG parsé avec succès:
   - Width: 200
   - Height: 150
   - Path principal trouvé: Oui
   - Décorations trouvées: 2

hikeId (UUID): 123e4567-e89b-12d3-a456-426614174000
Nom de la map: Washington Section
Distance totale (numeric): 150.5
Orientation (portrait/landscape): landscape
Description EN (optionnel): Beautiful section through Washington
Description FR (optionnel): Belle section à travers Washington

✅ Requête SQL générée avec succès!
📄 Fichier sauvegardé: scripts/washington.sql
```

## 🐛 Dépannage

- **"Aucun path avec stroke-width="3" trouvé"** : Vérifiez que votre SVG contient bien un path avec `stroke-width="3"`
- **"Le fichier n'existe pas"** : Vérifiez le chemin du fichier SVG
