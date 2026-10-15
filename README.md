# compass-crab

<img src="preview.svg" alt="Pixel crab tossing the Compass logo" width="132">

A Claude Code mod: while Claude is working, a pixel crab tosses the Compass Education logo between its claws in the spinner row above the prompt. Desktop app only; a terminal session keeps the normal spinner.

## Install

In a terminal `claude` session (needs read access to this repo):

```
/plugin install compass-crab --marketplace jjayakumar-gif/compass-claude-mods
```

Answer `y` to add the marketplace, then pick the user scope.

## Change it

Size: `SCALE` in `hooks/register.tsx`. Turn off: `claude plugin disable compass-crab@local-mods`.
