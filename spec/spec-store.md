#Get all stores

```
curl -X GET \
  -H "X-Auth-Token: 66LOHAiB8Zeod1bAeLYW" \
  -H "Content-Type: application/json" \
  https://localhost:8080/stores
```

Success: 200  

Errors:  
401 - Unauthorized

Expected result:

{
    "results":[]
}

Scenarios:

* try GET without "X-Auth-Token" header should response 401  
* try GET with wrong "X-Auth-Token" header should response 401  


#Query a store `Scores`

```
curl -X GET \
  -H "X-Auth-Token: 66LOHAiB8Zeod1bAeLYW" \
  -H "Content-Type: application/json" \
  https://localhost:8080/stores/Scores
```

Success: 200  

Errors:   
401 - Unauthorized  

Expected result:

{
    "results":[]
}

Scenarios:

* try GET without "X-Auth-Token" header should response 401  
* try GET with wrong "X-Auth-Token" header should response 401  

#Get a document `Scores - ec8ffdf0-9b04-11e4-89d3-123b93f75cba`

```
curl -X GET \
  -H "X-Auth-Token: 66LOHAiB8Zeod1bAeLYW" \
  -H "Content-Type: application/json" \
  https://localhost:8080/stores/Scores/ec8ffdf0-9b04-11e4-89d3-123b93f75cba
```

Success: 200  

Errors:  
401 - Unauthorized   

Expected result:

{
    "results":[]
}

Scenarios:

* try GET without "X-Auth-Token" header should response 401  
* try GET with wrong "X-Auth-Token" header should response 401  

#Create document in Scores-Store (Server-side generated document key)

```
curl -X PUT \
  -H "X-Auth-Token: 66LOHAiB8Zeod1bAeLYW" \
  -H "Content-Type: application/json" \
  -d '{"score":1876,"playerName":"Karl","cheatMode":false}' \
  https://localhost:8080/stores/Scores
```

Success: 201  

Errors:  
400 - Bad Request  
401 - Unauthorized   

Expected result:

{
    "message":"created",
    "key":"..." //not falsy like undefined, null, etc.
}

Szenarios:

* try POST without "X-Auth-Token" header should response 401  
* try POST with wrong "X-Auth-Token" header should response 401  
* try POST without `Scores` path parameter
* try POST with space char in `Scores` path parameter (e.g. `Game Scores`)
* try POST with special chars like `/, ü, ö, *, ...`


#Create document in Scores-Store (Client-side generated document key)

```
curl -X POST \
  -H "X-Auth-Token: 66LOHAiB8Zeod1bAeLYW" \
  -H "Content-Type: application/json" \
  -d '{"score":1876,"playerName":"Karl","cheatMode":false}' \
  https://localhost:8080/stores/Scores/ec8ffdf0-9b04-11e4-89d3-123b93f75cba
```

Success: 201  

Errors:  
400 - Bad Request  
401 - Unauthorized   
405 - Method not allowd  

Expected result:

{
    "message":"created",
    "key":"ec8ffdf0-9b04-11e4-89d3-123b93f75cba"
}

Scenarios:

* try POST should response 201 and { message: 'created', key: '...'}
* try POST without "X-Auth-Token" header should response 401  
* try POST with wrong "X-Auth-Token" header should response 401  
* try POST without `Scores` path parameter should reponse 400 / 405
* try POST with space char in `Scores` path parameter (e.g. `Game Scores`) should reponse 400 / 405
* try POST with special chars like `/, ü, ö, *, ...` should reponse 400 / 405
* Store `Scores` should be created (show get all stores)
* Store `Scores` should have 1 document (show query a store)
* Document `Scores - ec8ffdf0-9b04-11e4-89d3-123b93f75cba` should be found in response and values should match  

```
{
    "$name":"Scores",
    "$store":"Scores",
    "$key":"ec8ffdf0-9b04-11e4-89d3-123b93f75cba",
    "$version":...,
    "$timestamp":"...",
    "$payload":{
        "score":1876,
        "playerName":"Karl",
        "cheatMode":false
    }
}
```

#Update a existing document in `Scores` store

```
curl -X PUT \
  -H "X-Auth-Token: 66LOHAiB8Zeod1bAeLYW" \
  -H "Content-Type: application/json" \
  -d '{"score":1337,"playerName":"Bob","cheatMode":true}' \
  https://localhost:8080/stores/Scores/1c9f4c3e-86bb-11e4-b116-123b93f75cba
```

Success: 202  
Errors:
400 - Bad Request  
401 - Unauthorized  
404 - Not Found  
405 - Method not allowed  
412 - Precondition Failed  

Scenarios:

* PUT should repsponse 202 and { "message":"update accepted" }
* try PUT without "X-Auth-Token" header should response 401  
* try PUT with wrong "X-Auth-Token" header should response 401  
* try PUT without `Scores` path parameter should reponse 400 / 405
* try PUT with space char in `Scores` path parameter (e.g. `Game Scores`) should reponse 400 / 405
* try PUT with special chars like `/, ü, ö, *, ...` should reponse 400 / 405
* try PUT with another -not existing- document key should response 404 - Not found
* try to GET the document and the document should be updated and the response body should contains the updated values

#Conditional update a existing document in `Scores`store

```
curl -i -X PUT \
  -H "X-Auth-Token: 66LOHAiB8Zeod1bAeLYW" \
  -H "Content-Type: application/json" \
  -H "If-Match: ..." \
  -d '{"score":1876,"playerName":"Karl","cheatMode":true}' \
  https://localhost:8080/stores/Scores/1c9f4c3e-86bb-11e4-b116-123b93f75cba
```

Success: 202  
Errors:
400 - Bad Request  
401 - Unauthorized  
404 - Not Found  
405 - Method not allowed  
412 - Precondition Failed  

Scenarios:

* PUT should repsponse 202 and { "message":"update accepted" }
* try PUT without "X-Auth-Token" header should response 401  
* try PUT with wrong "X-Auth-Token" header should response 401  
* try PUT without `Scores` path parameter should reponse 400
* try PUT with space char in `Scores` path parameter (e.g. `Game Scores`) should reponse 400
* try PUT with another -not existing- document key should response 404-Not found
* try to PUT the document with with "If-Match" < document.$version, the document version should be updated and the response body should contain the updated values
* try to PUT the document with with "If-Match" = document.$version, the document version should be updated and the response body should contain the updated values
* try to PUT the document with with "If-Match" > document.$version, the document version should response 412-Precondition Failed

#Delete documents

```
curl -X DELETE \
  -H "X-Auth-Token: 66LOHAiB8Zeod1bAeLYW" \
  -H "Content-Type: application/json" \
  https://localhost:8080/stores/Scores/1c9f4c3e-86bb-11e4-b116-123b93f75cba
```

Success: 202  
Errors:
400 - Bad Request  
401 - Unauthorized  
404 - Not Found  
405 - Method not allowed  

Scenarios:

* try DELETE should repsponse 202 and { "message":"delete accepted" }
* try DELETE with another -not existing- document key should response 202 and { "message":"delete accepted" }
* try DELETE without "X-Auth-Token" header should response 401  
* try DELETE with wrong "X-Auth-Token" header should response 401  
* try DELETE without `Scores` path parameter should reponse 400
* try DELETE with space char in `Scores` path parameter (e.g. `Game Scores`) should reponse 400

#Conditional delete documents

```
curl -X DELETE \
  -H "X-Auth-Token: 66LOHAiB8Zeod1bAeLYW" \
  -H "Content-Type: application/json" \
  -H "If-Match: ..." \
  https://localhost:8080/stores/Scores/1c9f4c3e-86bb-11e4-b116-123b93f75cba
```

Success: 202  
Errors:
400 - Bad Request  
401 - Unauthorized  
404 - Not Found  
405 - Method not allowed  
412 - Precondition Failed  

Scenarios:

* try DELETE should repsponse 202 and { "message":"delete accepted" }
* try DELETE with another -not existing- document key should response 202 and { "message":"delete accepted" }
* try DELETE without "X-Auth-Token" header should response 401  
* try DELETE with wrong "X-Auth-Token" header should response 401  
* try DELETE without `Scores` path parameter should reponse 400
* try DELETE with space char in `Scores` path parameter (e.g. `Game Scores`) should reponse 400
* try DELETE with another -not existing- document key should response 404-Not found
* try to DELETE the document with with "If-Match" < document.$version, the document version should be updated and the response body should contain the updated values
* try to DELETE the document with with "If-Match" = document.$version, the document version should be updated and the response body should contain the updated values
* try to DELETE the document with with "If-Match" > document.$version, the document version should response 412-Precondition Failed



