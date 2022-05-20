
export const priorityOptions = [
    { value: 'LOW', label: 'Low' },
    { value: 'MEDIUM', label: 'Medium' },
    { value: 'HIGH', label: 'High' }
].map(v => ({ ...v, type: "priority" }))

export const statusOptions = [
    { value: 'OPEN', label: 'Open' },
    { value: 'CLOSE', label: 'Close' },
    { value: 'HOLD', label: 'Hold' },
    { value: 'REJECTED', label: 'Rejected' }
].map(v => ({ ...v, type: "status" }))


export const typeOptions = [
    { value: 'ISSUE', label: 'Bug/Issue' },
    { value: 'FEATURE', label: 'Feature Request' },
    { value: 'PERFORMANCE', label: 'Performance Issue' },
].map(v => ({ ...v, type: "type" }))


export const rolesOptions = [
    { value: 'ROLE_PUBLIC', label: 'Public' },
    { value: 'ROLE_DEVELOPER', label: 'Developer' },
    { value: 'ROLE_TESTER', label: 'Tester' },
    { value: 'ROLE_MANAGER', label: 'Manager' },
    { value: 'ROLE_ADMIN', label: 'Admin' },
].map(v => ({ ...v, type: "type" }))


export const dummyRoles = [{
    "id": 1,
    "name": "Amery Cuncarr",
    "email": "acuncarr0@google.com.au",
    "roles": "ROLE_PUBLIC"
}, {
    "id": 2,
    "name": "Sandor Leibold",
    "email": "sleibold1@taobao.com",
    "roles": "ROLE_DEVELOPER"
}, {
    "id": 3,
    "name": "Creigh Taylot",
    "email": "ctaylot2@linkedin.com",
    "roles": "ROLE_PUBLIC"
}, {
    "id": 4,
    "name": "Garvey Ketchell",
    "email": "gketchell3@imgur.com",
    "roles": "ROLE_PUBLIC"
}, {
    "id": 5,
    "name": "Brittney Vose",
    "email": "bvose4@mac.com",
    "roles": "ROLE_MANAGER"
}, {
    "id": 6,
    "name": "Arie Tozer",
    "email": "atozer5@economist.com",
    "roles": "ROLE_TESTER"
}, {
    "id": 7,
    "name": "Sonni O'Kielt",
    "email": "sokielt6@wikimedia.org",
    "roles": "ROLE_DEVELOPER"
}, {
    "id": 8,
    "name": "Ara Allmann",
    "email": "aallmann7@acquirethisname.com",
    "roles": "ROLE_DEVELOPER"
}, {
    "id": 9,
    "name": "Norby Crank",
    "email": "ncrank8@alibaba.com",
    "roles": "ROLE_MANAGER"
}, {
    "id": 10,
    "name": "Nicholas Fluger",
    "email": "nfluger9@dropbox.com",
    "roles": "ROLE_PUBLIC"
}, {
    "id": 11,
    "name": "Ernie Lippiello",
    "email": "elippielloa@netlog.com",
    "roles": "ROLE_ADMIN"
}, {
    "id": 12,
    "name": "Gerard Caps",
    "email": "gcapsb@wired.com",
    "roles": "ROLE_ADMIN"
}, {
    "id": 13,
    "name": "Clovis Pheazey",
    "email": "cpheazeyc@nifty.com",
    "roles": "ROLE_TESTER"
}, {
    "id": 14,
    "name": "Tait Boyack",
    "email": "tboyackd@last.fm",
    "roles": "ROLE_DEVELOPER"
}, {
    "id": 15,
    "name": "Prent Harvison",
    "email": "pharvisone@oakley.com",
    "roles": "ROLE_DEVELOPER"
}, {
    "id": 16,
    "name": "Michelina Cuningham",
    "email": "mcuninghamf@guardian.co.uk",
    "roles": "ROLE_MANAGER"
}, {
    "id": 17,
    "name": "Sonni Atthowe",
    "email": "satthoweg@umich.edu",
    "roles": "ROLE_TESTER"
}, {
    "id": 18,
    "name": "Bowie Cawt",
    "email": "bcawth@hhs.gov",
    "roles": "ROLE_DEVELOPER"
}, {
    "id": 19,
    "name": "Bryon Favel",
    "email": "bfaveli@narod.ru",
    "roles": "ROLE_PUBLIC"
}, {
    "id": 20,
    "name": "Tremain Flecknoe",
    "email": "tflecknoej@wix.com",
    "roles": "ROLE_ADMIN"
}, {
    "id": 21,
    "name": "Alvin Diamant",
    "email": "adiamantk@bing.com",
    "roles": "ROLE_DEVELOPER"
}, {
    "id": 22,
    "name": "Deb Mulchrone",
    "email": "dmulchronel@aol.com",
    "roles": "ROLE_ADMIN"
}, {
    "id": 23,
    "name": "Mandy Stiling",
    "email": "mstilingm@google.es",
    "roles": "ROLE_DEVELOPER"
}, {
    "id": 24,
    "name": "Marchelle Vannet",
    "email": "mvannetn@paypal.com",
    "roles": "ROLE_ADMIN"
}, {
    "id": 25,
    "name": "Pren Batters",
    "email": "pbatterso@elpais.com",
    "roles": "ROLE_PUBLIC"
}]

