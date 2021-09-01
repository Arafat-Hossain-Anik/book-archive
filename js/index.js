const searchByName = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    const url = `http://openlibrary.org/search.json?q=${searchText}`;
    fetchData(url);
    searchField.value = '';
    const spinnerDiv = document.getElementById('spinner-div');
    document.getElementById('card-container').textContent = '';
    spinnerDiv.style.display = 'block';
}
const fetchData = async url => {
    const res = await fetch(url);
    const data = await res.json();
    displayData(data);
}
const displayData = bookData => {
    const booksArray = bookData.docs;
    // console.log(authorName);
    console.log(bookData.docs);
    const cardDiv = document.getElementById('card-container');
    let counter = 0;
    booksArray.forEach(bookInfo => {
        // console.log(bookInfo);
        const bookName = bookInfo.title;
        console.log(bookInfo.title);
        // console.log(bookInfo.author_name);
        const authorList = bookInfo.author_name;
        let authorName = '';
        if (authorList) {
            authorList.forEach(author => {
                authorName = authorName + author + ' ';
            });
        }
        else {
            authorName = 'Unknown';
        }
        let publisherName;
        if ('publisher' in bookInfo) {
            publisherName = bookInfo.publisher[0];
        }
        else {
            publisherName = 'Unknown';
        }
        // console.log("publisher name: ", bookInfo.publisher[0]);
        let publishYear = bookInfo?.first_publish_year;
        if (!publishYear) {
            publishYear = 'Unknown';
        }
        console.log("publish date", bookInfo.first_publish_year);
        const card = document.createElement('div');
        card.classList.add('col');
        card.innerHTML = `
              <div class="card h-100">
                <img src="..." class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${bookName}</h5>
                  <p class="card-text">Author Name: ${authorName}<br>Publisher Name: ${publisherName}<br> Publish Year: ${publishYear}</p>
                </div>
              </div>
        `;
        cardDiv.appendChild(card);
        counter++;
    });
    const spinnerDiv = document.getElementById('spinner-div');
    spinnerDiv.style.display = 'none';
    console.log(counter);
}
