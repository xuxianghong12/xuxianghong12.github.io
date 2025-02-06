let currentSortLink = null;

function sortPapers(criteria) {
    const list = document.getElementById('paperList');
    const items = Array.from(list.getElementsByClassName('paper'));

    items.sort((a, b) => {
        if (criteria === 'year') {
            let yearA = parseInt(a.getAttribute('data-year'));
            let yearB = parseInt(b.getAttribute('data-year'));
            if (yearA !== yearB) {
                return  yearB - yearA;
            }
            return a.getAttribute('data-author').localeCompare(b.getAttribute('data-author'));
        } else if (criteria === 'author') {
            let authorA = parseFloat(a.getAttribute('data-author'));
            let authorB = parseFloat(b.getAttribute('data-author')); 
            if (authorA !== authorB) {
                return  authorA - authorB;
            }
            return parseInt(b.getAttribute('data-year')) - parseInt(a.getAttribute('data-year')); 
        }
    });

    list.innerHTML = ''; 
    items.forEach(item => list.appendChild(item)); 

    if (currentSortLink) {
        currentSortLink.classList.remove('active'); 
    }
    
    currentSortLink = document.querySelector(`.sort-link[onclick="sortPapers('${criteria}')"]`);
    currentSortLink.classList.add('active'); 
}
sortPapers('year')