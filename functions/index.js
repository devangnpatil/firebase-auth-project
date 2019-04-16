const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data, context)=>{
    // get user and custom claim (admin)
    admin.auth().getUserByEmail(data.email).then(user =>{
        console.log('===>', user);
        return admin.auth().setCustomUserClaims(user.uid, {
            admin: true
        });
    }).then((data) =>{
        console.log('Success');
        return {
            message: `Success ${data.email} has been made admin.`
        }
    }).catch(err => {
        return err;
    })

})
