import namor from 'namor'

const range = len => {
    const arr = []
    for (let i = 0; i < len; i++) {
        arr.push(i)
    }
    return arr
}

//mocks a JSON response from a SERVER

const newPerson = () => {
    // const statusChance = Math.random()
    return {
        name: {
            title: namor.generate({ words: 1, numbers: 0 }),
            first: namor.generate({ words: 1, numbers: 0 }),
            last: namor.generate({ words: 1, numbers: 0 })
        },
        // name: {},
        // nameLast: namor.generate({ words: 1, numbers: 0 }),
        email: namor.generate({ words: 1, numbers: 0 }),
        location: {
            city: namor.generate({ words: 1, numbers: 0 })
        }
    }
}

export default function makeData(...lens) {
    const makeDataLevel = (depth = 0) => {
        const len = lens[depth]
        return range(len).map(d => {
            return {
                ...newPerson(),
                subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
            }
        })
    }

    return makeDataLevel()
}
