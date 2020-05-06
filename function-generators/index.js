function* genFnc() {
    yield ":v";
    console.log("after first yield!!");
    yield ":b";
    console.log("after second yield");
    return "done";
}

const g = genFnc();
g.next();                   // {value: ":v", done: false}
g.next();                   // after first yield !! 
                            // {value: ":b", done: false}
g.next();                   // after second yield
                            // {value: "done", done: true}
g.next();                   // {value: undefined, done: true}

// =================================================

function* getFruits() {
    yield "🥥"
    yield "🍓"
    yield "🍇"
    yield "🍉"
}

const genFruit = getFruits();
// [...genFruit] ~> ['🥥', '🍓', '🍇', '🍉']
console.log("genFruit", [...genFruit])

// =================================================

const emojis = ['👍', '👋'];
function* getEmojis() {
    yield '🤙'
    yield* emojis
    yield '🙏'
}

const x = getEmojis();
// [...x] ~> ['🤙', '👍', '👋', '🙏']

// =================================================

const bookClubs = [
    {
        name: "The cool club",
        clubMembers: [
            {
                name: "John Doe",
                books: [
                    { id: "sh891", title: "ahhiihihi" },
                    { id: "ey812", title: "where did you get to?" }
                ]
            }
        ]
    },
    {
        name: "The super cool club",
        clubMembers: [
            {
                name: "Nos nart",
                books: [
                    { id: "u9212", title: "hello world" },
                    { id: "hw123", title: "how have you been?" }
                ]
            }
        ]
    },
]
