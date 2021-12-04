const hamburger = document.querySelector('.hamburger')
const aside = document.querySelector('.layout__left')
let isMenuOpened = true;

if (localStorage.getItem('SINAM_OFFCANVAS_MENU') === null) {
  console.log('no localstorage record')
  localStorage.setItem('SINAM_OFFCANVAS_MENU', 'yes')
}

const open = () => {
  isMenuOpened = true
  aside.classList.remove('layout__left_hidden')
  requestAnimationFrame(() => {
    aside.dispatchEvent(new Event('sidemenu.open'))
  })
  localStorage.setItem('SINAM_OFFCANVAS_MENU', 'yes')
}

const close = () => {
  isMenuOpened = false
  aside.classList.add('layout__left_hidden')
  requestAnimationFrame(() => {
    aside.dispatchEvent(new Event('sidemenu.close'))
  })
  localStorage.setItem('SINAM_OFFCANVAS_MENU', 'no')
}

hamburger.addEventListener('click', () => {
  if (isMenuOpened) {
    close()
  } else {
    open()
  }
})

if (localStorage.getItem('SINAM_OFFCANVAS_MENU') === 'no') {
  close()
}
