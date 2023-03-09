const getUsers = require('./controller/user_controller.js').getUsers;

async function main() {
    const t = await getUsers({username: "nor" });
    console.log(t[0]);
}

main()