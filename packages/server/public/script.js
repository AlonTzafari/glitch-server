(() => {
    const ws = new WebSocket('/ws');
    ws.addEventListener('open', () => console.log('ws open'));
    ws.addEventListener('message', (e) => console.log(e.data));
})()