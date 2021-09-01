const url = `http://openlibrary.org/search.json?q=javascript`;
const fetchData = async url => {
    const res = await fetch(url);
    const data = await res.json();
    displayData(data);
}
const displayData = data => {
    console.log(data.docs);
}
fetchData(url);