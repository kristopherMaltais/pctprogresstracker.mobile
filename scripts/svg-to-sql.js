#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const readline = require("readline");

// Interface pour lire les inputs utilisateur
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

function parseSVG(svgContent) {
  // Extraire width et height
  const widthMatch = svgContent.match(/width="(\d+)"/);
  const heightMatch = svgContent.match(/height="(\d+)"/);

  const width = widthMatch ? parseInt(widthMatch[1]) : null;
  const height = heightMatch ? parseInt(heightMatch[1]) : null;

  // Extraire tous les paths
  const pathRegex = /<path[^>]*d="([^"]*)"[^>]*stroke-width="(\d+)"[^>]*\/>/g;
  const allPathsRegex = /<path[^>]*d="([^"]*)"[^>]*\/>/g;

  let mainPath = null;
  const decorations = [];

  // Trouver le path principal (stroke-width="3")
  let match;
  while ((match = pathRegex.exec(svgContent)) !== null) {
    if (match[2] === "3") {
      mainPath = match[1];
      break;
    }
  }

  // Trouver toutes les décorations (paths sans stroke-width="3")
  while ((match = allPathsRegex.exec(svgContent)) !== null) {
    const pathData = match[1];
    // Vérifier si ce n'est pas le path principal
    if (pathData !== mainPath) {
      decorations.push(pathData);
    }
  }

  return { width, height, mainPath, decorations };
}

function generateSQL(data) {
  const {
    width,
    height,
    orientation,
    mainPath,
    hikeId,
    name,
    totalDistance,
    descriptionEN,
    descriptionFR,
    decorations,
  } = data;

  // Échapper les apostrophes pour SQL
  const escapeSql = (str) => (str ? str.replace(/'/g, "''") : "");

  let sql = `-- Script généré pour ajouter une map et ses décorations\n\n`;

  // 1. Insérer la map
  sql += `-- 1. Insérer la map\n`;
  sql += `INSERT INTO maps (width, height, orientation, path, "hikeId", name, "totalDistance", "descriptionEN", "descriptionFR")\n`;
  sql += `VALUES (\n`;
  sql += `  ${width},\n`;
  sql += `  ${height},\n`;
  sql += `  '${escapeSql(orientation)}',\n`;
  sql += `  '${escapeSql(mainPath)}',\n`;
  sql += `  '${escapeSql(hikeId)}',\n`;
  sql += `  '${escapeSql(name)}',\n`;
  sql += `  ${totalDistance},\n`;
  sql += `  '${escapeSql(descriptionEN)}',\n`;
  sql += `  '${escapeSql(descriptionFR)}'\n`;
  sql += `);\n\n`;

  if (decorations.length > 0) {
    // 2. Insérer les décorations (si elles n'existent pas déjà)
    sql += `-- 2. Insérer les décorations (ignore si elles existent déjà)\n`;
    decorations.forEach((decoration, index) => {
      sql += `INSERT INTO decorations (decoration)\n`;
      sql += `VALUES ('${escapeSql(decoration)}')\n`;
      sql += `ON CONFLICT (decoration) DO NOTHING;\n`;
      if (index < decorations.length - 1) sql += `\n`;
    });
    sql += `\n`;

    // 3. Lier les décorations à la map
    sql += `-- 3. Lier les décorations à la map (remplacer <map_id> par l'ID de la map créée)\n`;
    decorations.forEach((decoration, index) => {
      sql += `INSERT INTO map_decoration ("mapId", "decorationId")\n`;
      sql += `SELECT <map_id>, id FROM decorations WHERE decoration = '${escapeSql(decoration)}';\n`;
      if (index < decorations.length - 1) sql += `\n`;
    });
  }

  return sql;
}

async function main() {
  try {
    console.log("=== Générateur de requête SQL pour Maps ===\n");

    // 1. Demander le nom du fichier SVG
    const svgFileName = await question("Nom du fichier SVG (ex: washington.svg): ");

    // Construire le chemin complet dans le dossier scripts
    const scriptDir = __dirname;
    const svgPath = path.join(scriptDir, svgFileName);

    if (!fs.existsSync(svgPath)) {
      console.error(`❌ Erreur: Le fichier "${svgFileName}" n'existe pas dans le dossier scripts.`);
      console.error(`   Chemin recherché: ${svgPath}`);
      rl.close();
      return;
    }

    // 2. Lire et parser le SVG
    const svgContent = fs.readFileSync(svgPath, "utf-8");
    const { width, height, mainPath, decorations } = parseSVG(svgContent);

    console.log(`\n✅ SVG parsé avec succès:`);
    console.log(`   - Width: ${width}`);
    console.log(`   - Height: ${height}`);
    console.log(`   - Path principal trouvé: ${mainPath ? "Oui" : "Non"}`);
    console.log(`   - Décorations trouvées: ${decorations.length}\n`);

    if (!mainPath) {
      console.error('❌ Erreur: Aucun path avec stroke-width="3" trouvé.');
      rl.close();
      return;
    }

    // 3. Demander les informations manquantes
    const hikeId = await question("hikeId (UUID): ");
    const name = await question("Nom de la map: ");
    const totalDistance = await question("Distance totale (numeric): ");
    const orientation = await question("Orientation (portrait/landscape): ");
    const descriptionEN = await question("Description EN (optionnel): ");
    const descriptionFR = await question("Description FR (optionnel): ");

    // 4. Générer le SQL
    const sql = generateSQL({
      width,
      height,
      orientation,
      mainPath,
      hikeId,
      name,
      totalDistance,
      descriptionEN,
      descriptionFR,
      decorations,
    });

    // 5. Sauvegarder dans un fichier dans le dossier scripts
    const outputPath = path.join(scriptDir, `${path.basename(svgPath, ".svg")}.sql`);
    fs.writeFileSync(outputPath, sql, "utf-8");

    console.log(`\n✅ Requête SQL générée avec succès!`);
    console.log(`📄 Fichier sauvegardé: scripts/${path.basename(outputPath)}\n`);
    console.log("=== Contenu de la requête ===\n");
    console.log(sql);

    rl.close();
  } catch (error) {
    console.error("❌ Erreur:", error.message);
    rl.close();
  }
}

main();
