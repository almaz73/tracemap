/**
 * Работа с вебсокетом
 */
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";

let that = this;

function connect(callback) {
  that.socket = new SockJS('/ambulance/websocket');
  that.stompClient = Stomp.over(that.socket);
  that.stompClient.connect(
    {},
    frame => {
      that.connected = true;
      callback(that.connected);
    },
    error => {
      that.connected = false;
      callback(that.connected, error)
    }
  );
}

function setStompClient(val, callback) {
  that.stompClient.subscribe(val, tick => {
    callback(tick);
  });
}

function send() {
  console.log("Send message:" + that.send_message);
  if (that.stompClient && that.stompClient.connected) {
    const msg = {name: that.send_message};
    that.stompClient.send("/user/topic/brigade/current", JSON.stringify(msg), {});
  }
}

function disconnect() {
  if (that.stompClient) {
    that.stompClient.disconnect();
  }
  that.connected = false;
}

function tickleConnection() {
  that.connected ? disconnect() : connect();
}

function getStateWebSocket() {
  return that.connected;
}

export {send, connect, setStompClient, disconnect, tickleConnection, getStateWebSocket}
