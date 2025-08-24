# Server

## Initial Dev Setup

To set up the server development environment, run the following commands:

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

## Database Setup

### Prisma Code Generation and Database Seed

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Seed the database with initial data
npx prisma db seed
```