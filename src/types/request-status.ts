export enum RequestStatus {
  SUCCESS = 200,
  API_ERROR = 404, // api error
  BAD_REQUEST = 403, // api error
  SERVER_ERROR = -2, // server error (e.g., exception thrown)
  NETWORK_ERROR = -3, // network error (not connected to internet)
  REQUEST_ERROR = -4, // request error something gone wrong locally within app
}
