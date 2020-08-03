/**
 * Example problem with existing solution and passing test.
 * See problem 0 in the spec file for the assertion
 * @returns {string}
 */
exports.example = () => 'hello world';

/**
 * Filter array of objects by filterProporties
 * @param {Array<string>} filterProperties array keys of proporties for filter from arrayObj
 * @param {Array} arrayObj array of objects
 * @returns filtred array of Objects
 */
exports.stripPrivateProperties = (filterProperties = [], arrayObj = []) => {
    if (!filterProperties || filterProperties.length < 1) {
        return arrayObj;
    };
    try {
        return arrayObj.map(obj => {
            filterProperties.forEach(filter => delete obj[filter]);
            return obj;
        });
    } catch (error) {
        console.error(error.message);
    }
}

/**
 * Return new array of Objects which not include property 
 * @param {string} property property name which will be exclude
 * @param {Array} arrayObjs array of objects
 * @returns filtred array of Objects
 */
exports.excludeByProperty = (property, arrayObjs = []) => {
    if (!property) {
        return arrayObjs;
    };
    try {
        return arrayObjs.filter(obj => !Object.keys(obj).includes(property));
    } catch (error) {
        console.error(error.message);
    }
};

/**
 * SumDeep val proporites in objects
 * @param {Array} objects e.g. [{objects:[{val:1},{val:2}]}]
 * @returns {Object} e.g [{objects:3}]
 */
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
 * @param {Object} statusColors e.g. {red:[101,202]}
 * @returns {Object} e.g {101:'red',202:'red'}
 */
const mapStatusColor = (statusColors = {}) => {
    const mappedStatusColor = {};
    Object.keys(statusColors).forEach((color) =>
        statusColors[color].forEach(status => {
            mappedStatusColor[status] = color;
        })
    );
    return mappedStatusColor;
};


/**
 * Apply proper Color to Status  code.
 * @param {Object} statusColors e.g. { red: [404, 400], green: [200, 201] } 
 * @param {Array} statuses e.g. [ { status: 404 } ]
 * @returns {Object} e.g. [ { status: 404 , color:'red' } ]
 */
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

/**
 * Function for create generic function greeting
 * @param {Function} greetFunc function for greeting(greetingString,name)
 * @param {string} greetingString string which will be use for greeting
 */
exports.createGreeting = (greetFunc, greetingString = "") =>
    (name) => greetFunc(greetingString, name);

/**
 * Function which return function for apply deafultsProporties
 * @param defaultProporties default props to attach in obj
 * @returns {Function} 
 */
exports.setDefaults = (defaultProporties = {}) => (obj = {}) =>
    ({
        ...defaultProporties,
        ...obj
    });


/**
 * Fetch proper Object by User
 * @param {string} userName user Name   
 * @param {Object} services : { fetchStatus, fetchUsers, fetchCompanyById  } its from p7.js
 * @returns {Object} e.g. 
 * {
 *  status: { time: Date , ok:true },
 *  user: { name: 'steve', companyId: 1 }
 *  company : { id: 1, name: 'fox' }
 * }
 */
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

