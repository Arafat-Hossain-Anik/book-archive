// Search Function 
const searchByName = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetchData(url);
    searchField.value = '';
    document.getElementById('card-container').textContent = '';
    spinnerVisibility('block');
    // counterVisibility('none');
}
// spinner visibility function
const spinnerVisibility = displayStyle => {
    const spinnerDiv = document.getElementById('spinner-div');
    spinnerDiv.style.display = displayStyle;
}
//total search result counter visibility
const counterVisibility = displayStyle => {
    const counterDiv = document.getElementById('counter-container')
    counterDiv.style.display = displayStyle;
}
// fetch data  
const fetchData = async url => {
    const res = await fetch(url);
    const data = await res.json();
    displayData(data);
}
//display data into window
const displayData = bookData => {
    const booksArray = bookData.docs;
    console.log(bookData.docs);
    const cardDiv = document.getElementById('card-container');
    let counter = 0;
    booksArray.forEach(bookInfo => {
        const bookName = bookInfo.title;
        console.log(bookInfo.title);
        const coverI = bookInfo.cover_i;
        let coverImageUrl;
        if (coverI) {
            coverImageUrl = `https://covers.openlibrary.org/b/id/${coverI}-M.jpg`;
        }
        else {
            coverImageUrl = `image/cover-image-2.jpg`;
        }
        const authorList = bookInfo.author_name;
        let authorName = '';
        //showing all author name
        if (authorList) {
            authorList.forEach(author => {
                authorName = authorName + author + ', ';
            });
            //removing last comma and space
            authorName = authorName.substring(0, authorName.length - 2);
        }
        else {
            authorName = 'Unknown';
        }
        //checking publisher name is available or not
        let publisherName;
        if ('publisher' in bookInfo) {
            publisherName = bookInfo.publisher[0];
        }
        else {
            publisherName = 'Unknown';
        }
        //checking publishing year is available or not
        let publishYear = bookInfo?.first_publish_year;
        if (!publishYear) {
            publishYear = 'Unknown';
        }
        // data showing in the window
        const card = document.createElement('div');
        card.classList.add('col');
        card.innerHTML = `
              <div class="card h-100">
                <img src="${coverImageUrl}" class="card-img-top img-fluid" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${bookName}</h5>
                  <p class="card-text"><b>Author Name:</b> ${authorName}<br><b>Publisher Name:</b> ${publisherName}<br> <b>Publish Year:</b> ${publishYear}</p>
                </div>
              </div>
        `;
        cardDiv.appendChild(card);
        counter++;
    });
    spinnerVisibility('none');
    const counterText = document.getElementById('search-result-counter')
    counterText.innerText = counter;
    counterVisibility('block');
    console.log(counter);
}
