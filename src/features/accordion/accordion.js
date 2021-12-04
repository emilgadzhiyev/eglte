export const accordion = (accordionElement) => {
    const sections = accordionElement.querySelectorAll('.collapse')
    sections.forEach((section) => {
        section.addEventListener('sat.collapse.open', () => {
            sections.forEach((s) => {
                if (s !== section) s.controller.close()
            })
        })
    })
}
document.querySelectorAll('.accordion').forEach(accordion)
