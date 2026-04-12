import * as Clipboard from 'clipboard'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      clipboard: Clipboard
    }
  }
})
