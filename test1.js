const gettools = require('./controller/toolsController').gettools;


async function main() {
    const tools = await gettools({});
    console.log(tools);
}

main()