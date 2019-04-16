const guideList = document.querySelector('.guides');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');

const setupUI = (user) =>{
  if(user){
    // toggle ui element
    db.collection('users').doc(user.uid).get().then(doc =>{
      const html = `
        <div>Logged in as ${user.email}</div>
        <div>User details ${doc.data().bio}</div>
      `
      accountDetails.innerHTML = html;
    })
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
  }else{
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
    accountDetails.innerHTML = '';
  }
}

// setup guides
const setupGuides = (data) => {
    if(data.length){
        let html = '';
        data.forEach(element => {
          
          const guide = element.data();
          const li = `
            <li>
              <div class="collapsible-header grey lighten-4">${guide.title}</div>
              <div class="collapsible-body white">${guide.description}</div>
            </li>
          `
          html += li
        });
        guideList.innerHTML = html;
    }else{
      guideList.innerHTML = "<h5 class='center'> Kindly log in to check all the details.</h5>"
    }
}

// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});
