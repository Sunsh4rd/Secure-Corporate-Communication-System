import SockJS from "sockjs-client";
import { over } from 'stompjs';

const connectToWebSocket = (id, chatMessages, setChatMessages) => {
    const socket = new SockJS('http://localhost:8080/ws');

    const stompClient = over(socket);

    console.log(id);

    // () => {stompClient.subscribe(`/taskChat.${id}`

    const onConnected = () => {
        // Subscribe to the Public Topic
        stompClient.subscribe(`/taskChat.${id}`, onMessageReceived);

        // Tell your username to the server
        // stompClient.send(`/app/taskChat.${task.id}.send`,
        //     {},
        //     JSON.stringify({ sender: "username", type: 'JOIN' })
        // )

    }

    stompClient.connect({}, onConnected, (e) => {});
    // stompClient.subscribe(`/taskChat.${id}`, () => console.log("subscribed"));

    

    const onMessageReceived = (msg) => {
        console.log(msg.body)
        setChatMessages((chatMessages) => [...chatMessages, msg.body])
    }

    return stompClient;
};

export default connectToWebSocket;