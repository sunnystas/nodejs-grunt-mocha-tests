#Get all stores

```
curl -X GET \
  -H "X-Auth-Token: 66LOHAiB8Zeod1bAeLYW" \
  -H "Content-Type: application/json" \
  https://localhost:8080/stores
```

Success: 200  

Errors:  
400 - Bad Request  
401 - Unauthorized   
500 - Internal Server Error  

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
400 - Bad Request  
401 - Unauthorized   
500 - Internal Server Error  

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
400 - Bad Request  
401 - Unauthorized   
500 - Internal Server Error  

Expected result:

{
    "results":[]
}

Scenarios:

* try GET without "X-Auth-Token" header should response 401  
* try GET with wrong "X-Auth-Token" header should response 401  

#Create document in Scores-Store (Server-side generated document key)

```
curl -X POST \
  -H "X-Auth-Token: 66LOHAiB8Zeod1bAeLYW" \
  -H "Content-Type: application/json" \
  -d '{"score":1876,"playerName":"Karl","cheatMode":false}' \
  https://localhost:8080/stores/Scores
```

Success: 201  

Errors:  
400 - Bad Request  
401 - Unauthorized   
500 - Internal Server Error  

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
500 - Internal Server Error  

Expected result:

{
    "message":"created",
    "key":"ec8ffdf0-9b04-11e4-89d3-123b93f75cba"
}

Scenarios:

* try POST without "X-Auth-Token" header should response 401  
* try POST with wrong "X-Auth-Token" header should response 401  
* try POST without `Scores` path parameter should reponse 400
* try POST with space char in `Scores` path parameter (e.g. `Game Scores`) should reponse 400
* try POST with special chars like `/, ü, ö, *, ...` should reponse 400
* Store `Scores` should be created (show get all stores)
* Store `Scores` should have 1 document (show query a store)
* Document `Scores - ec8ffdf0-9b04-11e4-89d3-123b93f75cba` should be found with response

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
412 - Precondition Failed
500 - Internal Server Error


Scenarios:

* try PUT without "X-Auth-Token" header should response 401  
* try PUT with wrong "X-Auth-Token" header should response 401  
* try PUT without `Scores` path parameter should reponse 400
* try PUT with space char in `Scores` path parameter (e.g. `Game Scores`) should reponse 400
* try PUT with another -not existing- document key should response 404-Not found
* try to GET the document and the document should be updated and the response body should contain the updated values

#Conditional update a existing document in `Scores`store

curl -i -X PUT \
  -H "X-Auth-Token: 66LOHAiB8Zeod1bAeLYW" \
  -H "Content-Type: application/json" \
  -H "If-Match: 1420558302234967" \
  -d '{"score":1876,"playerName":"Karl","cheatMode":true}' \
  https://localhost:8080/stores/Scores/1c9f4c3e-86bb-11e4-b116-123b93f75cba

Success: 202  
Errors:
400 - Bad Request
401 - Unauthorized
404 - Not Found
412 - Precondition Failed
500 - Internal Server Error

Scenarios:

* try PUT without "X-Auth-Token" header should response 401  
* try PUT with wrong "X-Auth-Token" header should response 401  
* try PUT without `Scores` path parameter should reponse 400
* try PUT with space char in `Scores` path parameter (e.g. `Game Scores`) should reponse 400
* try PUT with another -not existing- document key should response 404-Not found
* try to PUT the document with with "If-Match" < document.$version, the document should be updated and the response body should contain the updated values
* try to PUT the document with with "If-Match" = document.$version, the document should be updated and the response body should contain the updated values
* try to PUT the document with with "If-Match" > document.$version, the document should response 412-Precondition Failed


