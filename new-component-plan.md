# New Component Plan

## What is this?

For this project I am required to research and implement a back-end component which has not been covered in the course.

I have chosen to pursue deployment of this API using a free hosting service (of which I am a little surprised that free options are available).

## Options

Based on my research I have seen the following options:

- Qovery
    - Requires figuring out how to "dockerize" my API.
    - Thanks, but I don't think I want to do that.
- Vercel
    - Only personal accounts are free (unsure of the implications as of yet).
    - Creates a `vercel.json` in the repository, probably fine.
    - Seems alright.
- Heroku
    - Allows for automatic or manual deploying.
    - Free mode has the app sleep after 30 minutes without use, probably not a big deal, but can be fixed with "Kaffeine" if it needs fixing.
    - Free mode may possibly not exist, their website does not mention a free option.
    - Has a lot of AI garbage, this ain't the one.
- Render
    - Seems fine, nothing particularly notable.
- Firebase Functions
    - Has a more complicated setup process than the rest seem to have.
    - Less likely to have complications with firestore.
    - Something inside me does not vibe with this option.

So far it looks like Vercel and Render are the most usable options, as the rest have a variety of horrible trade-offs.

Vercel is my first choice based on what I've seen on its website. 
It just seems cooler to me, they're basically the same process as far as I'm aware.
In the case Vercel doesn't work or something, Render is the backup plan.

## What will I have to do?

So far, both Vercel and Render seem to have similar setup processes involving:
- Signing in
- Creating a project
- Connecting the github repository
- Configuring some things
- Win

