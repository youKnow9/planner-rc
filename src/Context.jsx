import React, { useContext, useState, createContext } from "react";

export const Context = React.createContext({
	participantsUpdated: false,
	setParticipantsUpdated: () => {},
	setNewParticipants: () => {},
});