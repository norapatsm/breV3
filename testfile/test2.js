const getusers = require('./controller/user_controller').getUsers;

async function main() {
    let user = await getusers({_id:"64084626398bf36b349317ed"});
    console.log(user[0].borrowed);

}

main()