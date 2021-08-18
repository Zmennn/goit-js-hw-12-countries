import { error, Stack } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
import "@pnotify/confirm/dist/PNotifyConfirm.css";
import { refs } from './refs';


export const notificationSettings = new Stack({
    dir1: 'down',
    dir2: 'right',
    firstpos1: 1,
    firstpos2: 1,
    maxOpen: 1,
    modal: 'false',
    positioned: true,
    context: refs.caution
})
export function onErrorNotification(title, text) {
    error({
        title: title,
        delay: 5000,
        text: text,
        stack: notificationSettings
    })
}


