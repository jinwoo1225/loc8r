# loc8r
## Example application from Getting MEAN with Mongo, Express, Angular and Node by Simon Holmes

Earlier I was deploying this to Heroku. But the problem is that the Heroku
add-on that supports MongoDB, mLab, uses MongoDB 3.x. The version that's
supported on 32-bit Ubuntu is 2.x. These two can't talk to each other.
Additionally, my attempt to compile MongoDB on a 32-bit platform failed, which
makes sense because MongoDB's development team have mentioned that they intend
to cease any support for 32-bit systems at all. DDD: So I had to stop using
Heroku. Fortunately this app can be run by cloning it and doing `npm start` in
the top-level directory.

I might consider trying to host this on Digital Ocean or AWS or something in
the future but right now that isn't a priority.
