const tableLayoutLeft = document.querySelector('.typical-table-layout__left')
const aside = document.querySelector('.layout__left')

aside.addEventListener('sidemenu.open', () => {
    tableLayoutLeft.classList.remove("typical-table-layout__left_expanded");
})

aside.addEventListener('sidemenu.close', () => {
    tableLayoutLeft.classList.add("typical-table-layout__left_expanded");
})
