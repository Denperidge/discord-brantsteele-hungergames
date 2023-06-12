# Brantsteele Hungergames Discord Wrapper

## How-to
**NOTE:** Either using your command line or a .env file, make sure to set your bots client id & token respectively in `BHGD_CLIENT_ID` & `BHGD_TOKEN`.

### Run (Docker Compose)
Pre-requirements: docker compose
```bash
git clone https://github.com/Denperidge/discord-brantsteele-hungergames.git
cd discord-brantsteele-hungergames
docker-compose up --detach
```

### Run (Node)
Pre-requirements: node.js & npm/yarn
```bash
git clone https://github.com/Denperidge/discord-brantsteele-hungergames.git
cd discord-brantsteele-hungergames
yarn install --dev
yarn start
```


### Build locally
Pre-requirements: node.js & npm/yarn

Install using the following commands
```bash
git clone https://github.com/Denperidge/discord-brantsteele-hungergames.git
cd discord-brantsteele-hungergames
yarn install --dev
yarn build
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


## Discussions
### Why a wrapper instead of a rebuild?
I explicitly did not want Discord bot that could replace it.That’d take a ton of work for something that either:
- Wouldn’t be as good as the original
- Or - if you’d dev it further than the original did - would be stuck in its Discord format, and not translate easily to a website

But with a wrapper (e.g. a Selenium browser instance) you can:
- Fully let a hunger games session play out in the exact same way as you could in the browser, but basically “streamed” to the text chat
- Create no more than usual traffic load for the website
- Easily link back to the original

### Not implementing the built-in saves & statistics
The website has a built-in save function, which is *not* used, for the following reasons:
- Less load on the brantsteele servers
- It saves (as far as I am aware? check this) solely seasons

### Further expansions
These are things that could be added to the project, but aren't planned to be developed by me. However, someone else is free to do so through a PR and/or their own fork.

#### Stats system
While there is no set idea on what to put in this or how to implement it, it would be interesting

#### Profile+
Expansion would be possible by perhaps allowing a user to have multiple profiles to switch between, or by having characters on a per server basis. But with the latter, make sure to be wary of possible abuse and vandalism?


## License
Brantsteele's own TOS apply for their website. All the code written by me in this repo falls under the [MIT License](LICENSE).
