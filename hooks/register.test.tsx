import { expect, test } from 'claude-code/testing'

const spinner = {
  plugin: 'compass-crab',
  surface: 'desktop',
  component: 'Spinner',
  props: { word: 'Working', message: null, suffix: '…', mode: 'thinking' },
} as never

test('the crab stands beside the engine spinner row', async ($, on) => {
  // Stands for the engine: what the row draws when the plugin passes.
  on('ui.render', ($, e) => {
    const { Text } = $.ui.resolve(e)
    return <Text>engine</Text>
  })

  const ui = await $.ui.mount(spinner)
  expect(await ui.find({ type: 'Svg' })).toBeDefined()
  expect(await ui.find({ type: 'Text', text: 'engine' })).toBeDefined()
  await ui.unmount()
})
