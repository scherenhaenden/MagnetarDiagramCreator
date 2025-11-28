export function parseVennCode(code) {
    const lines = code.trim().split('\n');
    const data = {
        title: '',
        sets: {},
        intersections: {}
    };

    for (let line of lines) {
        line = line.trim();
        if (!line) continue;

        if (line.startsWith('title')) {
            data.title = line.substring(5).trim();
        } else if (line.match(/^[A-Z]\s*\[.+\]\s*:\s*\d+$/)) {
             // Regex adjusted to allow spaces
            const match = line.match(/^([A-Z])\s*\[(.+)\]\s*:\s*(\d+)$/);
            if (match) {
                data.sets[match[1]] = {
                    label: match[2],
                    value: parseInt(match[3])
                };
            }
        } else if (line.match(/^[A-Z]{2,}\s*:\s*\d+$/)) {
             // Regex adjusted to allow spaces
            const match = line.match(/^([A-Z]{2,})\s*:\s*(\d+)$/);
            if (match) {
                data.intersections[match[1]] = parseInt(match[2]);
            }
        }
    }

    return data;
}
