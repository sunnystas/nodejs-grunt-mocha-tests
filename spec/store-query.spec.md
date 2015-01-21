**For this tests you need to prepare some Test-Fixures for Store-Query-Tests**

* before(...) should create (startup) some items in `Scores`-Store
* after(...) should remove (cleanup) created items in `Scores`-Store

#Limit document results

**Precondition (Fixture): 4 documents in store**  

```
curl -X GET \
  -H "x-auth-token: 66LOHAiB8Zeod1bAeLYW" \
  -G \
  --data-urlencode 'limit=2' \
  https://localhost:8080/stores/Scores
```

Status Code: 200  
Errors:
* 400 - Bad Request
* 401 - Unauthorized
* 405 - Method not found

Expected result:

* should be an object with an array of result objects
* should have N-documents in array
* should have documents with properties $name, $store, $key, $version, $timestamp, $payload

```
{
    "results":[
    	...
    ]
}
```

Scenarios:

* try GET should response 200 with expected results
* try GET with `limit=0` should response 200 with expected results (4-documents)
* try GET with `limit=2` should response 200 with expected results (2 documents)
* try GET with special chars (except _,-,@,!) in store should response 405
* try GET with special chars (except _,-,@,!) in key should response 400
* try GET without "X-Auth-Token" header should response 401  
* try GET with wrong "X-Auth-Token" header should response 401  

#Documents pagination

**Precondition (Fixture): 4 documents in store**  

##Page 1
```
curl -X GET \
  -H "x-auth-token: 66LOHAiB8Zeod1bAeLYW" \
  -G \
  --data-urlencode 'page=0' \
  --data-urlencode 'limit=2' \
  https://localhost:8080/stores/Scores
```

##Page 2
```
curl -X GET \
  -H "x-auth-token: 66LOHAiB8Zeod1bAeLYW" \
  -G \
  --data-urlencode 'page=1' \
  --data-urlencode 'limit=2' \
  https://localhost:8080/stores/Scores
```

Status Code: 200  
Errors:
* 400 - Bad Request
* 401 - Unauthorized
* 405 - Method not found

Expected result:

* should be an object with an array of result objects
* should have 2 document in array
* should have document with properties $name, $store, $key, $version, $timestamp, $payload

```
{
    "results":[
    	...
    ]
}
```

Scenarios:

* try GET should response 200 with expected results
* try GET with `page=0` should response 200 with expected results (4-documents)
* try GET with `page=-1` should response 200 with expected results (0-documents)
* try GET with `page=0, limit=2` should response 200 with expected results (2 documents)
* try GET with `page=1, limit=2` should response 200 with expected results (2 documents)
* try GET with `page=2, limit=2` should response 200 with expected results (0 documents)
* try GET with special chars (except _,-,@,!) in store should response 400
* try GET with special chars (except _,-,@,!) in key should response 400
* try GET without "X-Auth-Token" header should response 401  
* try GET with wrong "X-Auth-Token" header should response 401  

#Documents without payload

**Precondition (Fixture): 2 documents in store**  

```
curl -X GET \
  -H "x-auth-token: 66LOHAiB8Zeod1bAeLYW" \
  -G \
  --data-urlencode 'keysOnly=true' \
  https://localhost:8080/stores/Scores
```

Status Code: 200  
Errors:
* 400 - Bad Request
* 401 - Unauthorized
* 405 - Method not found

Expected result:

* should be an object with an array of result objects
* should have 2 documents in array
* should have documents with properties $name, $store, $key, $version, $timestamp
* should -not- have $payload

```
{
    "results":[
    	...
    ]
}
```

Scenarios:

* try GET should response 200 with expected results
* try GET with special chars (except _,-,@,!) in store should response 400
* try GET with special chars (except _,-,@,!) in key should response 400
* try GET without "X-Auth-Token" header should response 401  
* try GET with wrong "X-Auth-Token" header should response 401  

##Filter documents with *where* and JSON-Query

|Key             | Operation                 |
|================|===========================|
|$lt             | Less Than                 |
|$lte            | Less Than Or Equal To     |
|$gt             | Greater Than              |
|$gte            | Greater Than Or Equal To  |
|$ne             | Not Equal To              |
|$in             | Contained In              |
|$nin            | Not Contained in          |
|$exists         | A value is set for the key|
|$type           | Type of                   |
|$all            | Contains all values       |

##JSON-Query between

**Precondition (Fixture): 6 documents in store**  

```
curl -X GET \
  -H "x-auth-token: 66LOHAiB8Zeod1bAeLYW" \
  -G \
  --data-urlencode 'where={"score":{"$gte":1000,"$lte":3000}}' \
  https://localhost:8080/stores/Scores
```

Status Code: 200  
Errors:
* 400 - Bad Request
* 401 - Unauthorized
* 405 - Method not found

Expected result:

* should be an object with an array of result objects
* should have N-documents in array
* should have documents with properties $name, $store, $key, $version, $timestamp, $payload

```
{
    "results":[
    	...
    ]
}
```

Scenarios:

* try GET should response 200 with expected results
* try GET with special chars (except _,-,@,!) in store should response 400
* try GET with special chars (except _,-,@,!) in key should response 400
* try GET without "X-Auth-Token" header should response 401  
* try GET with wrong "X-Auth-Token" header should response 401  


##Query - GroupBy 

```
curl -X GET \
  -H "x-auth-token: 66LOHAiB8Zeod1bAeLYW" \
  -G \
  --data-urlencode 'groupby="name"' \
  https://localhost:8080/stores/Scores
```

Status Code: 200  
Errors:
* 400 - Bad Request
* 401 - Unauthorized
* 405 - Method not found

Expected result:

* should be an object
* should have properties grouped by document payload property name

Scenarios:

* try GET should response 200 with expected results
* try GET with special chars (except _,-,@,!) in store should response 405
* try GET with special chars (except _,-,@,!) in key should response 400
* try GET without "X-Auth-Token" header should response 401  
* try GET with wrong "X-Auth-Token" header should response 401  
