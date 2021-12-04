import { Logger } from '../../lib/logger'

const collapse = (collapseElement) => {
  if (collapseElement.controller) return collapseElement.controller
  const content = collapseElement.querySelector('.collapse__content')
  const hitarea = collapseElement.querySelector('.collapse-hitarea')
  let isOpen = collapseElement.classList.contains('.collapse_open')

  if (!hitarea || !content) throw new Error('No hitarea or no content element found')

  const open = () => {
    collapseElement.classList.add('collapse_open')
    hitarea.classList.add('collapse-hitarea_active')
    content.style.height = content.scrollHeight + 'px'
    if (!isOpen) dispatchOpenEvent()
    isOpen = true
  }

  const close = () => {
    collapseElement.classList.remove('collapse_open')
    hitarea.classList.remove('collapse-hitarea_active')
    content.style.height = null
    if (isOpen) dispatchCloseEvent()
    isOpen = false
  }

  const toggle = () => {
    if (isOpen) close()
    else open()
  }

  const dispatchOpenEvent = () => collapseElement.dispatchEvent(new Event('sat.collapse.open'))

  const dispatchCloseEvent = () => collapseElement.dispatchEvent(new Event('sat.collapse.close'))

  hitarea.addEventListener('click', toggle)

  const instance = { open, close, toggle }

  collapseElement.controller = instance

  return instance
}

try {
  document.querySelectorAll('.collapse').forEach(collapse)
} catch (e) {
  Logger.log(e)
}
