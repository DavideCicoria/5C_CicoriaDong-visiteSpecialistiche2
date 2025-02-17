export const createMiddleware = () => {
    return {
        setData: (data) => {
            return new Promise((resolve, reject) => {
                fetch("/booking/add", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify({
                        value: JSON.stringify(data)
                    })
                })
                .then(r => r.json())
                .then(data => resolve(data.result))
                .catch(err => reject(err.result));
            });
        },
        getData: () => {
            return new Promise((resolve, reject) => {
                fetch("/booking/", {
                    method: "GET",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify({
                        key: key
                    })
                })
                .then(r => r.json())
                .then(data => {
                    let dict = JSON.parse(data.result);
                    resolve(dict);
                })
                .catch(err => reject(err.result));
            })
        }
    };
}