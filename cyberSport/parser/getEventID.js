export default getEventID;

function getEventID(events, eventName) {
    const result = events.find(function (event) {
        return event.name === eventName;
    });

    if (result) {
        return result.id;
    }

    return 0;
}