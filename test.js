const getUsers = require('./controller/user_controller.js').getUsers;

async function main() {
    const t = await getUsers({ _id: "63f87b0cad469d09457d2dec" });
    console.log(t);
}

main()



const a = [
    {
        _id: new ObjectId("63f87b0cad469d09457d2dec"),
        username: '6410301012',
        password: '1234',
        fname: 'norapat',
        lname: 'saema'
    }
]