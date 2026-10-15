import type { Register } from 'claude-code'

const CLAY = '#D97757'
const INK = '#1F1E1D'
const BLUE = '#1389FD'

// The crab is the savvy-progress "Clawd" pixel crab (24x18 body on a 30x28 grid); the Compass logo
// is a smooth vector ball tossed between its claws. Pure CSS animation: the Svg is drawn as an image,
// where SMIL does not run. A viewBox of 33x32 grid units, cropped to the arc, shown at SCALE.
const SCALE = 1.75
const VIEW = { x: -1.5, y: -6, w: 33, h: 32 }

const SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="${VIEW.w * SCALE}" height="${VIEW.h * SCALE}" viewBox="${VIEW.x} ${VIEW.y} ${VIEW.w} ${VIEW.h}">
<style>
.la{animation:st .5s steps(1) infinite}.lb{animation:st .5s steps(1) infinite -.25s}.bd{animation:bob .5s steps(1) infinite -.125s}
.la,.lb,.bd,.cl,.cr{transform-box:fill-box}
.cl{animation:cL 2s steps(1) infinite}.cr{animation:cR 2s steps(1) infinite}
.bx{animation:bx 1s linear infinite alternate}.by{animation:by 1s infinite}
.nd{animation:spin 1.5s linear infinite}
@keyframes st{50%{transform:translateY(-1px)}}@keyframes bob{50%{transform:translateY(1px)}}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes bx{from{transform:translateX(-1.5px)}to{transform:translateX(18.5px)}}
@keyframes by{0%{transform:translateY(-2px);animation-timing-function:cubic-bezier(.2,.7,.4,1)}50%{transform:translateY(-6px);animation-timing-function:cubic-bezier(.6,0,.8,.3)}100%{transform:translateY(-2px)}}
@keyframes cL{0%,8%{transform:translateY(-3px)}16%,84%{transform:translateY(0)}92%,100%{transform:translateY(-3px)}}
@keyframes cR{0%,34%{transform:translateY(0)}42%,58%{transform:translateY(-3px)}66%,100%{transform:translateY(0)}}
@media (prefers-reduced-motion:reduce){*{animation:none!important}}
</style>
<g class="bx"><g class="by"><g transform="scale(0.0258)" shape-rendering="geometricPrecision">
<path d="M165,16 Q252,-4 338,12 Q344,14 342,22 L326,74 Q324,80 316,78 Q252,64 190,80 Q182,82 180,74 L160,24 Q158,18 165,16 Z" fill="${BLUE}"/>
<circle cx="251" cy="358" r="215" fill="none" stroke="${BLUE}" stroke-width="72"/>
<g transform="translate(251,358)"><g class="nd"><path d="M0,-111 L46,-35 Q56,-21 50,-5 L0,111 L-44,32 Q-56,18 -50,3 Z" fill="${BLUE}" stroke="${BLUE}" stroke-width="6" stroke-linejoin="round"/></g></g>
</g></g></g>
<g shape-rendering="crispEdges">
<g class="bd"><rect x="7" y="10" width="16" height="12" fill="${CLAY}"/><rect class="cl" x="3" y="14" width="4" height="4" fill="${CLAY}"/><rect class="cr" x="23" y="14" width="4" height="4" fill="${CLAY}"/><rect x="9" y="12" width="2" height="2" fill="${INK}"/><rect x="19" y="12" width="2" height="2" fill="${INK}"/></g>
<g class="la"><rect x="7" y="22" width="2" height="4" fill="${CLAY}"/><rect x="17" y="22" width="2" height="4" fill="${CLAY}"/></g>
<g class="lb"><rect x="11" y="22" width="2" height="4" fill="${CLAY}"/><rect x="21" y="22" width="2" height="4" fill="${CLAY}"/></g>
</g>
</svg>`

export const register: Register = on => {
  // The spinner row has no card around it (the AbovePrompt band does), so the crab stands bare
  // beside whatever the engine draws there, its own mark and the word included.
  on('ui.render', { component: 'Spinner' }, async ($, e, next) => {
    const ui = $.ui.resolve(e)

    if (!('Svg' in ui)) {
      return next(e)
    }

    const { Box, Svg, Text } = ui
    const engine = await next(e)

    return (
      <Box flexDirection="row" alignItems="center" gap={1}>
        <Svg
          source={SVG}
          alt="A pixel crab tossing the Compass Education logo"
          width={VIEW.w * SCALE}
          height={VIEW.h * SCALE}
        />
        {engine ?? <Text dimColor>{`${e.props.message ?? e.props.word}${e.props.suffix}`}</Text>}
      </Box>
    )
  })
}
