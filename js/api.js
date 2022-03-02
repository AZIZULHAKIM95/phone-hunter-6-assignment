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


// Mobile Details API
const loadMobileDetails = id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayMobiledetails(data.data))
}

// Display Search Result
const displaySearchResult = (fulldata, condition = 0) => {
    console.log(fulldata, condition);
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = ''
    if (!condition) {
        fulldata = fulldata.slice(0, 20);
    }
    fulldata.forEach(data => {
        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML = `
                <div  class="card">
                        <img src="${data.image}" class="card-img-top w-50 mx-auto" alt="...">
                        <div class="card-body mx-auto">
                            <h3 class="card-title">${data.brand}</h3>
                            <h4 class="card-title">${data.phone_name}</h4>
                            <button onclick="loadMobileDetails('${data.slug}')"  type="button" class="btn btn-primary">
                            Explore>>
                          </button>  
                        </div>
                    </div>
                `
        searchResult.appendChild(div)
    })
    const showmore = document.getElementById("showmore")
    showmore.innerHTML = ""
    if (!condition) {
        const div = document.createElement('div')
        div.innerHTML = `<button onclick="searchMobile(option=1)">Show More</button>`
        showmore.appendChild(div)

    }
}