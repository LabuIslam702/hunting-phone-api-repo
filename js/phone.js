const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones, isShowAll);

}

const displayPhones = (phones, isShowAll) => {
        // step-1 
    const phoneContainer = document.getElementById('phones-container');
    // clear phone container cards before adding new cards
    phoneContainer.textContent = '';
    // display all show button process
    const displayShowAllButton = document.getElementById('show-all-container');
    if(phones.length > 12 && !isShowAll){
        displayShowAllButton.classList.remove('hidden');
    }
    else{
        displayShowAllButton.classList.add('hidden');
    }
    //  if not show all 

   if(!isShowAll){
    phones = phones.slice(0,12);
   }

    // console.log(phones);
    phones.forEach(phone => {
        // console.log(phone);

        // step-2 create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `
        card  bg-gray-100 shadow-xl
        `;

        // step-3 set innerHtml 
        phoneCard.innerHTML = `
            <figure><img  src="${phone.image}" /></figure>
        <div class="card-body">
             <h2 class="card-title">${phone.phone_name}</h2>
             <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-center">
             <button onclick ="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
             </div>
        </div>
        
        `;
        // step-4: append child
        phoneContainer.appendChild(phoneCard);

    });
    // hide loading spinner
    toggleLoadingSpinner(false);

};

const handleShowDetail = async (id) => {
    // console.log('click show details', id);

    const res = await fetch (`https://openapi.programming-hero.com/api/phone/apple_iphone_13_pro_max-11089 ${id}`)
    const info = await res.json();
     const phone = info.data;
     console.log(phone);
    showPhoneDetail(phone);
}

const showPhoneDetail = (phone) => {
    console.log(phone);

    const phoneName = document.getElementById('phone-details-name');
    phoneName.innerText = phone.phone_name;


    // show the modal
    show_details_modal.showModal()
}


// handle search button
const handleSearch = (isShowAll) =>{
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText, isShowAll);
}

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');

    if(isLoading){
        loadingSpinner.classList.remove('hidden');

    }
    else{
        loadingSpinner.classList.add('hidden');
    }
};

// handle Show All

// const handleShowAll = () => {
//    handleSearch(true)

// }
loadPhone();

  