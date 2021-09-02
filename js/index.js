// Search Function 
const searchByName = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetchData(url);
    searchField.value = '';
    document.getElementById('card-container').textContent = '';
    spinnerVisibility('block');
    counterVisibility('none');
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
    // definning data array
    const booksArray = bookData.docs;
    const totalBooks = booksArray.length;
    // card container for showing data
    const cardDiv = document.getElementById('card-container');
    // variable for only showing 20 data
    let counter = 0;
    let showCounter = 0;
    // accessing every book information from books array
    booksArray.forEach(bookInfo => {
        const bookName = bookInfo.title;
        // definning coveri for cover image
        const coverI = bookInfo.cover_i;
        let coverImageUrl;
        // setting cover image
        if (coverI) {
            coverImageUrl = `https://covers.openlibrary.org/b/id/${coverI}-M.jpg`;
        }
        //if cover image is not availble
        else {
            coverImageUrl = `image/cover-image.jpg`;
        }
        //many author name for one book
        const authorList = bookInfo.author_name;
        let authorName = '';
        //showing all author name
        if (authorList) {
            //comabining many author name into one varible
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
        let publishYear = bookInfo.first_publish_year;
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
                  <h4 class="card-title">${bookName}</h4>
                  <p class="card-text">
                  <h6><b>Author Name:</b> ${authorName}</h6>
                  <h6><b>Publisher Name:</b> ${publisherName}</h6>
                  <h6><b>Publish Year:</b> ${publishYear}</h6>
                  </p>
                </div>
              </div>
        `;
        counter++;
        // showing only 20 result
        if (counter < 21) {
            cardDiv.appendChild(card);
            showCounter++;
        }
    });
    spinnerVisibility('none');
    const totalBooksText = document.getElementById('search-result-counter');
    const showingBooks = document.getElementById('showing-result-counter');
    if (totalBooks === 0) {
        totalBooksText.innerText = 'No Search Result Found.';
    }
    else {
        totalBooksText.innerText = totalBooks;
        showingBooks.innerText = showCounter;
    }
    counterVisibility('block');
}
