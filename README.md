# Dooper Fullstack bootcamp

Hola!

We are thrilled to have you onboard and happy to collaborate with you for the next months.

**The Project:**

We will be creating a basic e-commerce website with two user in mind - vendor and shopper.

**Technologies:**

- Next.js
- Typescript
- Supabase
- React Query
- Vercel

## Prerequisites

- [Node.js](https://nodejs.org/en/download/)
- [Visual Studio Code](https://code.visualstudio.com/download)
- [Slack](https://slack.com/)
- [Linear](https://linear.app)

## Getting Started

First clone this repository.

Install dependencies

`yarn install`

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Generators

Create a new component

`yarn generate component`

Create a new page

`yarn generate page`

## Project management

We will be using [Linear](https://linear.app) for our sprint planning and day-to-day work.

Stories will be assign to you and you are responsible of:

- Estimate stories
- Breakdown story as needed
- Update status (some of them are already integrated with Github)

## Git strategy

We will follow the following git strategy:

```
main --
     | -- fernando/dev  - DEV BRANCH
                     |--- fernando/BOO-1-ticket - TICKET BRANCH
```

`main`: **NEVER** merge to main, we will be only pulling under request ONLY

`dev`: This is your development branch, you will be always merging TICKET BRANCHES into this branch.

`(ticket-branch)`: This branch will be created for every ticket / story in Linear.

## General conventions

- We prefer styled-component over `<Component sx={{styles}}/>`
- MUI imports should be based off `@mui/material`
- Use plop generated template to create components, pages, services, etc.

## Deployment

Deploying will be handle by Vercel.

Vercel will create **preview links** for every pull request where things will be QA'd.
