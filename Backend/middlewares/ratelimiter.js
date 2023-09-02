const rate = (limit, time, blockedTime) => {

    const requests = {};

    setInterval(() => {

        for (const ip in requests) {
    

            const now = Date.now();
            const timeWindow = requests[ip].timeWindow;
            const blockedUntil = requests[ip].blockedUntil;

            requests[ip].requests = requests[ip].requests.filter((time) => {
                return time > now - timeWindow;
            });

            if (requests[ip].requests.length === 0) {
                requests[ip].timeWindow = now;
            }

            if (blockedUntil && blockedUntil <= now) {
                requests[ip].blockedUntil = null;
                requests[ip].requests = [];
                requests[ip].timeWindow = now;
            }

        }
    }, time);


    return (req, res, next) => {


        const ip = req.ip;

        const now = Date.now();

        requests[ip] = requests[ip] || { requests: [], timeWindow: now };


        if (requests[ip].blockedUntil && requests[ip].blockedUntil > now) {
            const remainingTime = Math.ceil((requests[ip].blockedUntil - now) / 1000);
            res
                .status(429)
                .send(
                    `Too many requests, please try again after ${remainingTime} seconds.`
                );
        }
        else if (requests[ip].requests.length >= limit) {
            requests[ip].blockedUntil = now + blockedTime;
            const remainingTime = Math.ceil(blockedTime / 1000);
            res
                .status(429)
                .send(
                    `Too many requests, please try again after ${remainingTime} seconds.`
                );
        } else {
            requests[ip].requests.push(now);
            next();
        }
    };
};

module.exports = rate ;
