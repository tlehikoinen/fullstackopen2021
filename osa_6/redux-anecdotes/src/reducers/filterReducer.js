const filterReducer = (state = '', action) => {
    switch(action.type) {
        case 'SETFILTER': {
            return action.content
        }
        default:
            return state
    }
}

export const setFilter = (filter) => {
    return {
        type: 'SETFILTER',
        content: filter
    }
}

export default filterReducer