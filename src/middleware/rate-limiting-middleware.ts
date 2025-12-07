import ratelimit from "express-rate-limit";

export const authRateMiddleware=ratelimit({
    windowMs:1*60*1000,
    max:5,
    message:"Too many attempts, please try againg after 10 minute"
})
