import axios from "axios";
import { useCallback } from "react";
import { useSelector } from "react-redux";

const useAuthorizedHttp = () => {
    const appCtx = useSelector((state) => state.app);
    return useCallback(
        (requestOptions, successCallback, errorCallback, completeCallback) =>
            axios({
                method: requestOptions.method ? requestOptions.method.toLowerCase() : "GET",
                url: requestOptions.url,
                headers: {
                    "Content-Type": "application/json",
                    "X-Auth-Token": appCtx.authToken,
                    "X-App-Token": process.env.REACT_APP_APP_TOKEN
                },
                data: requestOptions.data ? JSON.stringify(requestOptions.data) : null
            })
                .then((response) =>

                    Promise.resolve().then(() => {
                        successCallback && successCallback(response.data)
                    })
                        .catch((response) => Promise.reject(errorCallback && errorCallback(response)))
                        .finally(() => {
                            completeCallback && completeCallback();
                        })),
        [appCtx.authToken]
    );
};

export default useAuthorizedHttp;
