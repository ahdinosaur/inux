module.exports = {
  path: ['cats', 'fetch'],
  create: () => ({
    run: (effect) => {
      console.log('cat:fetch', effect)
    }
  })
}

