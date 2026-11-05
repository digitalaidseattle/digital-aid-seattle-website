<p align='center'>
    <a href='https://www.digitalaidseattle.org'>
        <img src='https://avatars.githubusercontent.com/u/3466034?s=200&v=4' height='128'>
    </a>
    <h1 align='center'>Digital Aid Seattle Website</h1>
</p>
<p align='center'>
    <img alt="GitHub commit activity (main)" src="https://img.shields.io/github/commit-activity/m/digitalaidseattle/digital-aid-seattle-website/main">
</p>

## Introduction

Digital Aid Seattle aims to amplify community impact with technology by connecting organizations who need technical solutions with skilled volunteers.

People across thousands of Seattle civic and nonprofit organizations have dedicated their lives to making the world safer, more equitable, and more sustainable. This work is responsible for so much good in the world, and we owe them a huge debt of gratitude.

Unfortunately, many of these organizations lack access to digital tools that are vital to success in the modern age. Nonprofits struggle to create and scale their impact without the resources they need.

Just outside their doors is a fleet of experts and technologists with the talent, capacity, and drive to build.

Seattle is world-renowned as a hub for technology talent, full of motivated builders, designers, and creators that want to use their skills for good. Digital Aid Seattle is bringing these communities together to create a sum greater than its parts.

This website is for organizations that want to [learn more about partnering with Digital Aid Seattle](https://www.digitalaidseattle.org/partners) and for passionate, skilled Seattlites who want to [learn more about volunteering!](https://www.digitalaidseattle.org/volunteers)

## Technology Stack

The website is built using **Next.js**, a React-based framework for server-side rendering and static site generation. Learn more about Next.js [here](https://nextjs.org/docs/getting-started).

**Superhuman** (formerly Coda) holds the volunteer roles, projects, partners and volunteers shown on the site, and hosts the volunteer and partner sign-up forms. See the API documentation [here](https://coda.io/developers/apis/v1).

**Sanity.io** serves as the content management system (CMS), providing a flexible and customizable platform for team members to manage and publish content. Check out Sanity.io's documentation [here](https://www.sanity.io/docs).

**Vercel** is used for deployment, providing a fast and scalable hosting environment for the website. Once a pull request is made, Vercel will automatically deploy a staged version of the website for final approval prior to deploying these changes to the public-facing website. Learn more about Vercel [here](https://vercel.com/docs).

## System Requirements

1. [Node.js](https://nodejs.org/en/) 20.11 or newer (see .nvmrc)

## Local Environment Setup

1. Setup the frontend environment

   ```bash
   git clone https://github.com/digitalaidseattle/digital-aid-seattle-website
   cd digital-aid-seattle-website
   git checkout main
   yarn install
   ```

2. Setup VSCode for auto formatting

- Install extensions: ESLint and Prettier
- Go to VSCode setting `Settings` > `Text Editor` > `Formatting` > `Format On Save`
- In the same setting window, look up `Default Formatter` and set to Prettier.

### Configure Environmental Variables

1. Copy the example file:

   ```bash
   cp .env.local.example .env.local
   ```

2. Fill in the values in .env.local and save. Ask the team for any keys you need.

### Run locally

1. Start development server

   ```bash
   yarn dev
   ```

2. Open local instance in browser: <http://localhost:3000>. Note: Pages populated by Sanity.io will return 404 until Sanity is properly configured.

3. In order to work on Sanity components, request to be added to Sanity.io as an administrator, and then populate the respective fields in the .env.local file.

4. In order to work on roles, projects, partners or volunteers, request access to the DAS Superhuman workspace and create an API token.

## Contributing

1. Set up local environment.
2. Ensure access to appropriate accounts:
   - Github: Must be member of [Digital Aid Seattle Github Org](https://github.com/digitalaidseattle) in order to push changes to the repo.
   - Vercel: Must be a member of [Digital Aid Seattle Group on Vercel](https://vercel.com/digitalaidseattle/digital-aid-seattle-website) to approve staged changes to production.
   - Sanity.io: Must be added as administrator in order to edit content managed by Sanity.io [The Digital Aid Seattle Sanity Dashboard can be accessed here](https://www.digitalaidseattle.org/studio)
   - Superhuman: Must have access to the DAS Superhuman workspace in order to edit forms and the data shown on the site.
3. Get issue from the [DAS Jira board](https://digital-aid-seattle.atlassian.net/jira/software/projects/DW/summary).
4. Create a branch with the following convention: username/feature-name

   ```bash
   git checkout -b <username/feature-name>
   ```

5. Make desired updates.
6. Commit changes with the following convention: category: Description

   ```bash
   git add --all
   git commit -m 'feat: Updated project layout to include project contributors'
   ```

7. Squash branch commits to a single commit. In this example, the contributor made three commits:

   ```bash
   git reset --soft @~3
   git commit -m 'feat: Updated project layout to include project contributors'
   ```

8. Create pull request and ask for review
