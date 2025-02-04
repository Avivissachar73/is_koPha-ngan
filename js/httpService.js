// const API_KEY = 'AIzaSyClJEGatJZ5nsl0wqdDZ3KLGNHKVUsY9WA';
// const API_KEY = 'AIzaSyAi-uHpQRtH4d8Uc3FfTX0MmEfeDuRySWY';
const API_KEY = 'AIzaSyAOosApgfyr-1IHme3iyQGaisd2uSAtjFY'; // issacharaviv gmail;

export async function getIsKophangan() {
    const pos = await _getCoords();
    const res = await fetch(_buildApi(pos)).then(res => res.json());
    if (res.status === 'REQUEST_DENIED') throw new Error('Error 404, Api request denied');
    return res.results.find(currRes => {
        return currRes.address_components.find(curr => curr.long_name.toLowerCase().includes('ko pha-ngan'));
    }) || false;

}

function _buildApi(pos) {
    return `https://maps.googleapis.com/maps/api/geocode/json?latlng=${pos.lat},${pos.lng}&key=${API_KEY}`;
}

function _getCoords() {
    // return Promise.resolve({lat: 9.7577800, lng: 100.0291400});
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((position) => {
            resolve({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            })
        }, reject);
    });
}