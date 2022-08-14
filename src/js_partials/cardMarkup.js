export const makeMarkup = (acc, item) => {
    return acc + `
    <div class="photo-card">
        <a class="img-link" href="${item.largeImageURL}">
            <img class="image" src="${item.previewURL}" alt="${item.tags}" loading="lazy"/>
        </a>
        <div class="info">
            <p class="info-item">
                <b>Likes:</b> 
                <span class="info-value">${item.likes}</span>
            </p>
            <p class="info-item">
                <b>Views:</b> 
                <span class="info-value">${item.views}</span>
            </p>
            <p class="info-item">
                <b>Comments:</b> 
                <span class="info-value">${item.comments}</span>
            </p>
            <p class="info-item">
                <b>Downloads:</b> 
                <span class="info-value">${item.downloads}</span>
            </p>
        </div>
    </div>
    `
}