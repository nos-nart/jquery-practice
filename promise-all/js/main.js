window.addEventListener('load', event => {
    const getUsers = () => {
        return new Promise((resolve, reject) => {
            return setTimeout(() => resolve([
                {
                    name: 'kapi',
                    id: 123
                },
                {
                    name: 'nos',
                    id: 456
                },
                {
                    name: 'kipa',
                    id: 789
                }
            ]), 2000)
        })
    }

    const getNames = users => {
        return new Promise((resolve, reject) => {
            return setTimeout(() => resolve(users.name), 1000)
        })
    }

    const capitalizeName = name => {
        return new Promise((resolve, reject) => {
            return setTimeout(() => resolve(String(name).toUpperCase()), 500)
        })
    }

    const runAsyncFunc = async () => {
        const users = await getUsers();
        console.log("TCL: runAsyncFunc -> users", users)
        Promise.all(
            users.map(async user => {
                const userName = await getNames(user);
                console.log("TCL: runAsyncFunc -> userName", userName);

                const capName = await capitalizeName(userName);
                console.log("TCL: runAsyncFunc -> capName", capName)
            })
        )
    }

    document.querySelector('.btn').addEventListener('click', function () {
        runAsyncFunc();
    })
})
