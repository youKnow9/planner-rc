import React, { useContext, useState, createContext } from "react";

export const Context = React.createContext({
	participantsUpdated: false,
	setParticipantsUpdated: () => {},
	setNewParticipants: () => {},
	// setEventsDelite: [],
});

export const useSetEvents = () => {
	const { eventsDelite, setEventsDelite } = useContext(Context);

	const handleDelEvent = (id) => {
        console.log(eventsDelite)
		const updatedEvents = []
        eventsDelite.map((el => {
            if (el.id !== id){
                updatedEvents.push(el)
            }
        }))
        console.log(updatedEvents)
        setEventsDelite(updatedEvents);
		// eventsDelite(updatedEvents);
	};

	return [handleDelEvent, eventsDelite ];
};