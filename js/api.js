let search = ''

// Search Result Store In A String
const searchMobile = (option = 0) => {
    if (!option) {
        const searchfield = document.getElementById('search-field');
        const searchText = searchfield.value;
        search = searchText

        // Clear Search Data
        searchfield.value = '';
    }
    const searchText = search


    // Error Handler
    const phoneError = document.getElementById('error-1');
    if (searchText == 0) {
        phoneError.innerText = "!!!! Please Enter A Phone Name!!!!"
    }
    else {
        const url = `
         https://openapi.programming-hero.com/api/phones?search=${searchText}
        `;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                if (data.data.length) {
                    displaySearchResult(data.data, option)
                }
                else {
                    phoneError.innerText = "!!!! Sorry No Phone Is Found !!!!"
                }
            })
    }
}