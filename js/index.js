const searchByName = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    const url = `http://openlibrary.org/search.json?q=${searchText}`;
    fetchData(url);
    searchField.value = '';
    const spinnerDiv = document.getElementById('spinner-div');
    spinnerDiv.style.display = 'block';
}
const fetchData = async url => {
    const res = await fetch(url);
    const data = await res.json();
    displayData(data);
}
const displayData = data => {
    console.log(data.docs);
    const spinnerDiv = document.getElementById('spinner-div');
    spinnerDiv.style.display = 'none';
}
