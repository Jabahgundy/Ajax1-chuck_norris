'use strict';

// const request = new XMLHttpRequest();
// request.onreadystatechange = function () {
//     console.log(this);
//     if (this.readyState === 4) {
//         console.log("Response is: ", this.response);
//     }
// }
// request.open('GET', 'https://api.chucknorris.io/jokes/random?category=dev');
// request.send();

document.addEventListener("DOMContentLoaded", function () {
    const chuckQuote = document.querySelector('#chuckQuote');
    const quoteButton = document.querySelector('#getQuote');
    const defaultCategory = "dev";
    let currentCategory = defaultCategory;

    function fetchTheQuote(category) {
        const fetchRequest = fetch(`https://api.chucknorris.io/jokes/random?category=${category}`
        ).then(function (response) {
            return response.json();
        }).then(function (data) {
            updateQuote(data);
        })
    }

    function fetchTheCategories() {
        fetch("https://api.chucknorris.io/jokes/categories").then(function (response) {
            return response.json();
        })
            .then(function (data) {
                console.log('category data is: ', data);
                updateCategories(data);
            })
    }




    function updateQuote(dataFromFetch) {
        const theQuote = dataFromFetch.value;
        console.log(theQuote);
        chuckQuote.innerText = theQuote;
    }

    function updateCategories(categoryData) {
        const filteredList = categoryData.filter(function (category) {
            if (category !== "explicit" && category !== "political" && category !== "sport") {
                return category;
            }
        })

        const categoryListForm = document.querySelector('#categoryList');
        const selectElement = document.createElement('select');

        filteredList.forEach(function (category) {
            const categoryOptionElement = document.createElement('option');
            categoryOptionElement.value = category;
            categoryOptionElement.text = category;
            if (category === "dev") {
                categoryOptionElement.setAttribute("selected", true);
            }
            selectElement.appendChild(categoryOptionElement);
        });

        categoryListForm.appendChild(selectElement);


        selectElement.addEventListener('change', function (event) {

            const newCategoryName = event.target.value;
            currentCategory = newCategoryName;
            fetchTheQuote(currentCategory);
        });

    }




    quoteButton.addEventListener('click', function () {
        console.log("current category: ", currentCategory);
        fetchTheQuote(currentCategory);
    })

    fetchTheQuote(currentCategory);
    fetchTheCategories();




});






