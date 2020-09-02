## 1. Redux
Redux ist eien Javascript Biblliothek füre eine übesichtlicheres Mangament von Zusatandswerten (States) in React-Anwendungen

## 2. Bestandteile von Redux

### 2.1 Store

Im Store werden die Programmzustände (application states) als JSON-Objekte gespeichert:

BEISPIEL :
```javascript 
{
  contacts: [{
    name: 'David'
  }, {
    name: 'Amy'
  }],
  toggle: true
}
```
> Diese Datenobjekte können NICHT direkt Verändert werden

### 2.1 Actions 

- Eine Action ist ein einfaches JavaScript Objekt und beschreibt WARUM eine Aktion ausgelöst wurde: 
```javascript
{
  type: 'ADD_CONTACT', 
  name: 'James' 
}
```

### 2.2 Reducer