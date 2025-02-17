export const generateFetchComponent = () => {
    return {
        setData: (data) => {
            return new Promise((resolve, reject) => {
                fetch("/booking/add", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify(data)
                })
                .then(r => r.json())
                .then(data => resolve(data.result))
                .catch(err => reject(err.result));
            });
        },
        getData: () => {
            return new Promise((resolve, reject) => {
                fetch("/booking/")
                .then(r => r.json())
                .then(data => {
                    resolve(data);
                })
                .catch(err => reject(err.result));
            })
        }
    };
}
