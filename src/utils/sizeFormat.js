export default (size) => {
    const kiloBytes = 1024;
    const megaBytes = kiloBytes * 1024;
    const gigaBytes = megaBytes * 1024;

    if (size > gigaBytes) {
        return (size / gigaBytes).toFixed(1) + 'GB';
    }
    if (size > megaBytes) {
        return (size / megaBytes).toFixed(1) + 'MB';
    }
    if (size > kiloBytes) {
        return (size / kiloBytes).toFixed(1) + 'KB';
    }

    return size + 'B';
}