let a = {
    1: 2,
    3: 4,
    5: 6,
    7: 8
};

for (const [k, v] of Object.entries(a)) {
    console.log(`${k}=> ${v}`);
}