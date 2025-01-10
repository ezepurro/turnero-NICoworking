
export const getSessionLength = ( sessionZones ) => {
    if ( sessionZones === 1 || sessionZones === 3 ) {
        return 15;
    } else if ( sessionZones == 5 ) {
        return 20;
    } else {
        return 25;
    }
}