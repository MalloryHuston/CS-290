$(document).ready(function() {
    realmStatus();
});

function realmStatus() {

    let $list = $('.server-list');
    let $load = $('.server-loading');

    let info = {
        key: 'kccpjk8nb8z7hvjyvbkvxhzxjakz4wjz'
    };

    let requestURL = "https://us.api.battle.net/wow/realm/status?locale=en_US&apikey=" + info.key;

    $.get(requestURL, function(data, status) {

        serverArray = data.realms;

        serverArray.forEach(function(realm) {

            let type = realm.type,
                name = realm.name,
                bg = realm.battlegroup,
                pop = realm.population,
                status = realm.status;

            let newRow = buildRow(type, name, bg, pop, status);

            $list.append(newRow);
        });

    }).done(function() {
        $load.removeClass('show');
        $list.addClass('show');
    });
}

function buildRow(type, name, bg, pop, status) {

    let newPop = pop.toLowerCase();

    if (newPop === 'n/a') {
        newPop = 'Unknown';
    } else {
        newPop = newPop.charAt(0).toUpperCase() + newPop.substring(1);
    }

    return `
        <div class="server-row">
            <div class="data server-type ${type}">${type}</div>
            <div class="data server-name">${name}</div>
            <div class="data server-bg">${bg}</div>
            <div class="data server-pop ${newPop.toLowerCase()}">${newPop}</div>
            <div class="data server-status ${status}">${status ? 'Online' : 'Offline'}</div>
        </div>
    `

}