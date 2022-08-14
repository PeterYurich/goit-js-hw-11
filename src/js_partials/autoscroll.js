export function smoothScroll() {
    const cardHeight = document
        .querySelector(".gallery")
        .firstElementChild.getBoundingClientRect().height;

    window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth",
    });
}