export default function dateFormatter (date) {
    return date.toISOString().slice(0,10)
}