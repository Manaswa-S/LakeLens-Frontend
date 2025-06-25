
export function toReadableTime(time: string) {
    const dateTime = new Date(time);
    const readableDateTime = dateTime.toLocaleString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });

    return readableDateTime;
}


export function fromUnixToReadable(unix: number | string) {
    const dateTime = new Date(Number(unix))
    const readableDateTime = dateTime.toLocaleString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });
    return readableDateTime;
}

export function abbreviateBytes(bytes: number | string, decimals: number = 2): string {
    const number = Number(bytes);

    if (isNaN(number)) return 'NaN';

    const units = [
        { value: 1_000_000_000_000, suffix: 'TB' },
        { value: 1_000_000_000, suffix: 'GB' },
        { value: 1_000_000, suffix: 'MB' },
        { value: 1_000, suffix: 'KB' }
    ];

    for (const { value, suffix } of units) {
        if (number >= value) {
            const converted = number / value;
            return `${Number(converted.toFixed(decimals))} ${suffix}`;
        }
    }

    return `${Number(number.toFixed(decimals))}`;
}

export function abbreviateNumber(input: number | string, decimals: number = 3): string {
    const number = Number(input);

    if (isNaN(number)) return 'NaN';

    const units = [
        { value: 1_000_000_000, suffix: 'B' },
        { value: 1_000_000, suffix: 'M' },
        { value: 1_000, suffix: 'K' }
    ];

    for (const { value, suffix } of units) {
        if (number >= value) {
            const converted = number / value;
            return `${Number(converted.toFixed(decimals))} ${suffix}`;
        }
    }

    return `${Number(number.toFixed(decimals))}`;
}
