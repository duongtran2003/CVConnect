import { API_URL } from "~/plugins/axios";

// export const SOCKET_ENDPOINT = API_URL;
// export const SOCKET_ENDPOINT = "http://26.9.175.39:8888";
export const SOCKET_ENDPOINT = "https://api.vclab.tech";

export const SOCKET_EVENT = {
  NOTIFY: "notify",
  UNREAD_NOTIFY: "unread_notify",
};

export const SOCKET_CHAT_EVENT = {
  NEW_MESSAGE: "new_message",
  READ_ALL_MESSAGE: "read_all_messages",
  NEW_CONVERSATION: "new_conversation",
};
