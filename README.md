# loc8r
## Example application from Getting MEAN with Mongo, Express, Angular and Node by Simon Holmes

Earlier I was deploying this to Heroku. But the problem is that the Heroku
add-on that supports MongoDB, mLab, uses MongoDB 3.x. The version that's
supported on 32-bit Ubuntu is 2.x. These two can't talk to each other.
Additionally, my attempt to compile MongoDB on a 32-bit platform failed, which
makes sense because MongoDB's development team have mentioned that they intend
to cease any support for 32-bit systems at all. DDD: So I had to stop using
Heroku.

Fortunately this app can be run by cloning it. But first MongoDB has to be set up.
Follow my
[instructions](https://github.com/readyready15728/misc/blob/master/mongodb-authorization.md)
on how to set up an administrative user on MongoDB. Then, while still in the
Mongo shell, carry out the following commands:

```
use loc8r
db.createUser({user: 'loc8r', pwd: 'fugger-express', roles: ["readWrite", "dbAdmin"]});
```

That assumes you don't want to change the credentials I give to Mongoose
herein. (Yes, I'm aware that my password is out in the open. No, I don't use it
for anything else, so don't try anything funny. And yes, [Fugger-Express is
real](http://i0.kym-cdn.com/photos/images/facebook/001/118/306/dc8.jpg).) If
you don't like "fugger-express" then use something else, but be aware that you will
have to change `app_api/models/db.js` accordingly.

Then restore the contents of the database, which have been provided here in
directory `mongodump`. The restoration process goes like so:

```bash
mongorestore -h localhost -d loc8r -u admin -p --authenticationDatabase admin mongodump/
```

After all this is said and done, it should be possible to start the app by
doing `npm start` in the root directory.

I might consider trying to host this on Digital Ocean or AWS or something in
the future but right now that isn't a priority.
