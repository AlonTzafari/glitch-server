(() => {
    const ws = new WebSocket(`wss://${window.location.hostname}/ws`);
    ws.addEventListener('open', () => console.log('ws open'));
    ws.addEventListener('message', (e) => console.log(e.data));
})()