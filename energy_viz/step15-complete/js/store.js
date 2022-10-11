let state = {
    selectedIndicator: 'country'
};

function action(type, param) {
    switch(type) {
        case 'setSelectedIndicator':
            state.selectedIndicator = param;
            break;
    }

    update();
}
