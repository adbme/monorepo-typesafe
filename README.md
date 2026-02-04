# Monorepo Type-Safe (Bun + Elysia + Drizzle)

Stack moderne ultra-rapide avec validation de type de bout en bout.

## 🛠 Structure
- `apps/server`: API Elysia (Bun)
- `packages/db`: Schéma Drizzle, Migrations, Docker Postgres
- `packages/env`: Validation des variables d'environnement (**Valibot**)
- `packages/config`: Configuration TypeScript partagée

## 🚀 Démarrage Rapide
1. `bun install`
2. `bun run db:start` (Lance Postgres via Docker)
3. `bun run db:push` (Synchronise le schéma)
4. `bun run dev:server` (Lance l'API en mode watch)

## 📖 Scripts principaux
- `db:studio`: Interface graphique pour la base de données
- `db:down`: Nettoyage complet (containers + volumes)
- `check-types`: Vérification globale des types


# Installation + config

``` bash
bun install

cp .env.example .env
```

Lancer Postgres via Docker :

``` bash
bun run db:start
```

Synchroniser le schéma Drizzle avec la base de données :

``` bash
bun run db:push
```

Lancer le serveur en mode développement :

``` bash
bun run dev:server
```

# test crud 

## Créer un post avec une image - CURL EXAMLE
``` bash
curl -v -X POST http://localhost:3000/notes \
  -F "title=Capitale de la France" \
  -F "type=test443" \
  -F "content=La réponse est Paris." \
  -F "image=@test-image.png"
```

## Récupérer toutes les notes - CURL EXAMPLE
``` bash
curl -X GET http://localhost:3000/notes
```

## Récupérer une note par ID - CURL EXAMPLE
``` bash
curl -X GET http://localhost:3000/notes/1
```

# Supprimer une note par ID - CURL EXAMPLE
``` bash
curl -X DELETE http://localhost:3000/notes/1
```