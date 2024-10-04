import React from "react";

interface INotification {
	message: string;
}

export const NotificationInputError = ({ message }: INotification) => {
	return <label className="tex-color-red">{message}</label>;
};
