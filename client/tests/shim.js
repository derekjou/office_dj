globalThis.requestAnimationFrame = callback => {
    setTimeout(callback, 0)
}