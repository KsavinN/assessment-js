/**
 * Example problem with existing solution and passing test.
 * See problem 0 in the spec file for the assertion
 * @returns {string}
 */
exports.example = () => 'hello world';

exports.stripPrivateProperties = (filterProporties = [], arrayObj = []) => {
    if (!filterProporties || filterProporties.length < 1) {
        return arrayObj;
    };
    return arrayObj.map(obj => {
        filterProporties.forEach(filter => delete obj[filter]);
        return obj;
    });
}
exports.excludeByProperty = (property, arrayObjs = []) => {
    if (!property) {
        return arrayObjs;
    };
    return arrayObjs.filter(obj => !Object.keys(obj).includes(property));
};
exports.sumDeep = (objects = []) => {
    if (!objects) {
        return 0;
    }
    return objects.map(({ objects }) =>
        ({
            objects: objects.reduce((prev, { val }) => prev + val, 0)
        })
    )
};

/**
 * Map statusColor Object to status color
 * @param statusColors e.g. {red:[101,202]}
 * @returns {Object} e.g {101:'red',202:'red'}
 */
const mapStatusColor = (statusColors = {}) => {
    const mappedStatusColor = {};
    Object.keys(statusColors).forEach((color) =>
        statusColors[color].forEach(status => {
            mappedStatusColor[status] = !mappedStatusColor[status] ? color : mappedStatusColor[status]
        })
    );
    return mappedStatusColor;
}

exports.applyStatusColor = (statusColors = {}, statuses = []) => {
    const mappedStatusToColor = mapStatusColor(statusColors);
    return statuses.filter(({ status }) => mappedStatusToColor[status])
        .map(({ status }) =>
            ({
                status,
                color: mappedStatusToColor[status]
            })
        )
};

exports.createGreeting = (greetFunc, greetingString = "") =>
    (name) => greetFunc(greetingString, name);

exports.setDefaults = (defaultProporties = {}) => (obj = {}) =>
    ({
        ...defaultProporties,
        ...obj
    });

exports.fetchUserByNameAndUsersCompany = (userName = "", { fetchStatus, fetchUsers, fetchCompanyById }) => {
    if (!userName) {
        return;
    }
    const getUserByName = (users) => users.find(({ name }) => name === userName);

    return Promise.all([
        fetchStatus(),
        fetchUsers(),
    ]).then(async ([status, users]) => {
        const user = getUserByName(users)
        const company = await fetchCompanyById(user.companyId)
        return ({
            status,
            user,
            company
        })
    }).catch(
        e => console.error(e)
    );
};




