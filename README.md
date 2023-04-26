<p align='center'>
    <a href='https://www.openseattle.org'>
        <img src='https://avatars.githubusercontent.com/u/3466034?s=200&v=4' height='128'>
    </a>
    <h1 align='center'>Open Seattle Website</h1>
</p>
<p align='center'>
    <img alt="GitHub commit activity (main)" src="https://img.shields.io/github/commit-activity/m/openseattle/open-seattle-website/main">
</p>

## Introduction

Open Seattle aims to amplify community impact with technology by connecting organizations who need technical solutions with skilled volunteers.

People across thousands of Seattle civic and nonprofit organizations have dedicated their lives to making the world safer, more equitable, and more sustainable. This work is responsible for so much good in the world, and we owe them a huge debt of gratitude.

Unfortunately, many of these organizations lack access to digital tools that are vital to success in the modern age. Nonprofits struggle to create and scale their impact without the resources they need.

Just outside their doors is a fleet of experts and technologists with the talent, capacity, and drive to build.

Seattle is world-renowned as a hub for technology talent, full of motivated builders, designers, and creators that want to use their skills for good. Open Seattle is bringing these communities together to create a sum greater than its parts.

This website is for organizations that want to [learn more about partnering with Open Seattle](https://www.openseattle.org/partner) and for passionate, skilled Seattlites who want to [learn more about volunteering!](https://www.openseattle.org/volunteer)

## Technology Stack
The website is built using **Next.js**, a React-based framework for server-side rendering and static site generation. Learn more about Next.js [here](https://nextjs.org/docs/getting-started).

**Airtable** is integrated to create forms for volunteers and partners to sign up, providing a database for storing and managing their information. Explore Airtable's documentation [here](https://airtable.com/developers/docs).

**Sanity.io** serves as the content management system (CMS), providing a flexible and customizable platform for team members to manage and publish content. Check out Sanity.io's documentation [here](https://www.sanity.io/docs).

**Vercel** is used for deployment, providing a fast and scalable hosting environment for the website. Once a pull request is made, Vercel will automatically deploy a staged version of the website for final approval prior to deploying these changes to the public-facing website. Learn more about Vercel [here](https://vercel.com/docs).

## System Requirements

1. [Node.js](https://nodejs.org/en/)

## Local Environment Setup

1. Setup the frontend environment

   ```bash
   git clone https://github.com/openseattle/open-seattle-website 
   cd open-seattle-website
   git checkout main
   npm install
   ```

### Configure Environmental Variables

1. Create .env.local file:

    ```bash
    touch .env.local
    ```

2. Paste the following into this file and save:

    ```.env
    # Defaults, used by ./intro-template and can be deleted if the component is removed
    NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER="sanity-io"
    NEXT_PUBLIC_VERCEL_GIT_PROVIDER="github"
    NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG="template-nextjs-clean"

    # Required, find them on https://manage.sanity.io
    NEXT_PUBLIC_SANITY_PROJECT_ID=
    NEXT_PUBLIC_SANITY_DATASET=

    # see https://www.sanity.io/docs/api-versioning for how versioning works
    NEXT_PUBLIC_SANITY_API_VERSION="2022-11-28"

    # Required for making form requests.
    AIRTABLE_API_KEY=
    ```

### Run locally

1. Start development server

    ```bash
    npm run dev
    ```

2. Open local instance in browser: <http://localhost:3000>. Note: Pages populated by Sanity.io will return 404 until Sanity is properly configured.

3. In order to work on Sanity components, request to be added to Sanity.io as an administrator, and then populate the respective fields in the .env.local file.

4. In order to work on Airtable forms, request access to Airtable and create a personal access token

## Contributing

1. Set up local environment.
2. Ensure access to appropriate accounts:
    - Github: Must be member of [Open Seattle Github Org](https://github.com/openseattle) in order to push changes to the repo.
    - Vercel: Must be a member of [Open Seattle Group on Vercel](https://vercel.com/openseattle/open-seattle-website)to approve staged changes to production.
    - Sanity.io: Must be added as administrator in order to edit content managed by Sanity.io [The Open Seattle Sanity Dashboard can be accessed here](https://www.openseattle.org/studio)
    - Airtable: Must have shared access to the group Airtable account in order edit Airtable forms.
3. Get issue from group Asana board.
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

## Notes

### Working With Airtable

- [Airtable API Reference](https://airtable.com/developers/web/api/introduction)
- For work with specific fields, see the [custom API guide for our workspace](https://airtable.com/apprZrgVYuYaUHuhk/api/docs#curl/introduction)
