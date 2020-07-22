# OBRest - Rest library for openbravo secure web services módule.

## Documentation

You can see the [documentation here](https://futit.github.io/obrest)

## Examples

### Initialize app

```jsx
import OBRest from 'obrest';

OBRest.init("http://localhost:8080");
```


### Login with username and password / token
The app should be initialized before login

```jsx
await OBRest.loginWithUserAndPassword("Openbravo","openbravo"); //Make a request to get token

OBRest.loginWithToken("your_token");  //only set token
```

### Create criterias
The user should be logged before get data.
```jsx
let criteria = OBRest.getInstance().createCriteria("Product");

criteria.add(Restriction.equals("name","Cerveza Lager 0,5L"));

//make a request to get the products list
criteria.list();

//make a request to get only the first result
criteria.uniqueResult();
```
*Check the code reference for more information about Restrictions*

### Create/Update objects
The user should be logged before create data.

```jsx
let myProduct = {
    "_entityName":"Product", // this field is required.
    "searchKey": "ES/1234",
    "name": "Test product with OBRest.js",
    "description": "This is a test product created using OBRest.js",
    "uOM": "100",
    "salesRepresentative": "100",
    "summaryLevel": false,
    "stocked": true,
    "purchase": true,
    "sale": true,
    "productCategory": "DC7F246D248B4C54BFC5744D5C27704F",
    "volume": 0,
    "weight": 0,
    "taxCategory": "E020A69A1E784DC39BE57C41D6D5DB4E"
} 

let refreshedProduct = await OBRest.getInstance().save(myProduct); //this method save the object in openbravo and return a promise with the saved object.


// you can save a objects list too
let refreshedProductList = await OBRest.getInstance().saveList([
    myProduct
]); //this method save the objects in openbravo and return a promise with the saved list.
```

*It is always better to save lists than individual objects* 

### Remove objects
The user should be logged before delete data.

```jsx
let myProduct = {
    "_entityName":"Product", // this field is required.
    "searchKey": "ES/1234",
    "name": "Test product with OBRest.js",
    "description": "This is a test product created using OBRest.js",
    "uOM": "100",
    "salesRepresentative": "100",
    "summaryLevel": false,
    "stocked": true,
    "purchase": true,
    "sale": true,
    "productCategory": "DC7F246D248B4C54BFC5744D5C27704F",
    "volume": 0,
    "weight": 0,
    "taxCategory": "E020A69A1E784DC39BE57C41D6D5DB4E"
} 

let refreshedProduct = await OBRest.getInstance().remove(myProduct); //this method save the object in openbravo and return a promise with the saved object.


// you can remove a objects list too
let refreshedProductList = await OBRest.getInstance().removeList([
    myProduct
]); //this method remove the objects in openbravo and return a promise with the removed list.
```

*It is always better to remove lists than individual objects* 

## To run tests

```yarn test```

