#Dev Tinder API list


##Auth Router
-POST /signup
-POST /login
-POST /logout

##Profile Router
-GET /profile/view
-PATCH /profile/edit
-PATCH /profile/password

##Connection Request Router
-POST /request/send/interested/:userId
-POST /request/send/ignored/:userId
-POST /request/send/:status/:userId

-POST /request/review/accepted/:requestedId
-POST /request/review/rejected/:requestedId
-POST /request/review/:status/:requestedId


##User Router
-GET /user/requests/received
-GET /user/connections
-GET /user/feed - Gets you the profile of others in the platform


Status : Ignored,Interested,Accepted,Rejected






