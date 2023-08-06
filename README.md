# Archived
Archived in favor of a more built out / well managed monorepo coming soon.

# Portals Monorepo

## What is Portals?

Portals is the social protocol developer platform.

The future of social (in my eyes) is made up of open, decentralized social protocols. As such, a thriving ecosystem of developers is needed, just like an Ethereum or a Solana.

There's a problem though, the bar to entry for a lot of these social protocols, as a developer, is fairly high, or at least higher than it should be.

Portals is aiming to solve this challenge by providing stupid easy, one click tooling for developers to instantly access protocol data. Whether its getting access to a Farcaster Hub, or fetching Lens data with a single CURL.

## Monorepo Structure

The Portals Monorepo is currently made of 3 pillars.

### [Common](./common)

[Common](./common) holds packages that need to be shared between apps.

To view more info about these, view the [Common Documentation](./common/README.md)

### [Farcaster](./farcaster)

[Farcaster](./farcaster) holds packages and apps that are specific to the [Farcaster](https://farcaster.xyz) ecosystem and portals-related products. Stuff such as shared Hub nodes, protocol event-driven webhook builders, and more.

To view more info about these, view the [Farcaster Documentation](./farcaster/README.md)

### [Portals](./portals)

[Portals](./portals) holds packages and apps that are "cross-protocol" for portals. Our products that unify all the tooling from different protocols into simple interfaces. Stuff such as authentication APIs, management dashboards, and more.

To view more info about these, view the [Portals Documentation](./portals/README.md)

### [Templates](./templates) holds templates for different apps. TS apps, rust apps, etc...

## Getting Started

There's not a lot of stuff here currently, but if you'd still like to play around here, getting started is simple.

We use [Turborepo](https://turbo.build/repo) to manage the monorepo, so its as simple as:

### Step 1: Clone the repo

```shell
$ git clone https://github.com/withportals/portals
```

### Step 2: Install the dependencies

```shell
$ pnpm install
```

### Step 3: Build the project

```shell
$ pnpm build
```

### Step 4: Poke around

Now, its your turn to poke around in the packages and see what you can find

## Authors

[Landon Boles](https://github.com/TheLDB) - [Farcaster](https://warpcast.com/lndnnft)

## Credits

- [Zustand Next.JS Hydration Hook](https://github.com/pmndrs/zustand/issues/938#issuecomment-1481801942) by [shanehoban](https://github.com/shanehoban)
- [Space/Particle Background by the amazing team @ Spacedrive](https://github.com/spacedriveapp/spacedrive/blob/main/apps/landing/src/components/Bubbles.tsx)
-
