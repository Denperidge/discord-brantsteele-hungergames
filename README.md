# Brantsteele Hungergames Discord Wrapper

## Getting started

### Environment variables
Either using your command line or a .env file, make sure to set your bots client id & token respectively in `BHGD_CLIENT_ID` & `BHGD_TOKEN`.

### Clone & build locally
Pre-requirements: node.js & npm/yarn

Install using the following commands
```bash
git clone https://github.com/Denperidge/discord-brantsteele-hungergames.git
cd discord-brantsteele-hungergames
yarn install --dev
yarn build  # Builds the project to dist/
yarn start  # Run the project directly
```

## Reference
### Commands
/hungergames person1:@Matty person2:@Cat
/proceed
(TODO add a table & expand + document)

### The player & profile system
A `player` is what is used on the original briansteele website. A `profile` is a preset player that a user can make for themselves, that is locked to that specific server. (Oh, a `user` is a person in Discord)

The wrapper for **players** should allow the following:
- Set nickname, image url & internally used gender 
- Set the static value of "Real player/Real show" to use the `Use Custom` option
- Have a pronoun field, that will attempt to replace the pronouns used for that player (does some library for this already exist?)

The **profile** system should allow the following:
- Create a profile using one command
- Export easily for other servers, thanks to the above one-command creation
- Use the Discord avatar as a fallback if none is provided
- This profile should be linked to the Discord user on that specific server
- This profile should be able to be accessed by tagging the user during hungergames creation
- And this profile will have all the information to create a `player` automatically, without any extra steps needed


(Expansion would be possible by perhaps allowing a user to have multiple profiles to switch between, or by having characters on a per server basis? But with the latter, how do you prevent abuse and vandalism?)


### Stats system
(TODO figure out what to put in this or how to implement it)

## Discussions
### Why a wrapper instead of a rebuild?
I explicitly did not want Discord bot that could replace it.That’d take a ton of work for something that either:
- Wouldn’t be as good as the original
- Or - if you’d dev it further than the original did - would be stuck in its Discord format, and not translate easily to a website

But with a wrapper (e.g. a Selenium browser instance) you can:
- Fully let a hunger games session play out in the exact same way as you could in the browser, but basically “streamed” to the text chat
- Create no more than usual traffic load for the website
- Easily link back to the original

### Why not implement the built-in saves & statistics
The website has a built-in save function, which is *not* used, for the following reasons:
- Less load on the brantsteele servers
- It saves (as far as I am aware? check this) solely seasons

