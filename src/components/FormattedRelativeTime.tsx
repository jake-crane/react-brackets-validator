
const relativeTimeFormat = new Intl.RelativeTimeFormat('en');
const MILLISECONDS_IN_A_MINUTE = 60 * 1000;
const MILLISECONDS_IN_AN_HOUR = MILLISECONDS_IN_A_MINUTE * 60;
const MILLISECONDS_IN_A_DAY = MILLISECONDS_IN_AN_HOUR * 24;

interface ComponentProps {
    milliseconds: number;
}

function FormattedRelativeTime({ milliseconds }: ComponentProps): JSX.Element {
    const relativeMillis = Date.now() - milliseconds;

    if (relativeMillis < MILLISECONDS_IN_A_MINUTE) {
        return <>{relativeTimeFormat.format(Math.round(relativeMillis / 1000) * -1, 'seconds')}</>;
    }

    if (relativeMillis >= MILLISECONDS_IN_A_MINUTE && relativeMillis < MILLISECONDS_IN_AN_HOUR) {
        return <>{relativeTimeFormat.format(Math.round(relativeMillis / 1000 / 60) * -1, 'minutes')}</>;
    }

    if (relativeMillis >= MILLISECONDS_IN_AN_HOUR && relativeMillis < MILLISECONDS_IN_A_DAY) {
        return <>{relativeTimeFormat.format(Math.round(relativeMillis / 1000 / 60 / 60) * -1, 'hours')}</>;
    }

    return <>{relativeTimeFormat.format(Math.round(relativeMillis / 1000 / 60 / 60 / 24) * -1, 'days')}</>;
}

export default FormattedRelativeTime;
