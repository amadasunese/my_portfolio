function searchWebsite() {
    const searchInput = document.getElementById("searchInput");
    const searchTerm = searchInput.value.trim();

    if (searchTerm !== "") {
        // Replace this with your actual search logic
        // For example, you might use AJAX to fetch data from a server or filter elements on the page
        console.log("Searching for:", searchTerm);
    } else {
        alert("Please enter a search term.");
    }
}

document.getElementById("searchButton").addEventListener("click", searchWebsite);