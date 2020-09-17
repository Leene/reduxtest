> GitBash
>> $ cd E:/+++Projekte/+++Programmieren2020/reduxtest


TOBookMark: https://www.mediaevent.de/
_(Quelle: https://www.youtube.com/watch?v=poQXNp9ItL4&t=1599s)_

# Redux

## 1. Funktionale Programmierung bei Redux

= Funktionale Programmierung ist eine von 4 Programmierpradigmen:

- Funktional (Functional)
- Objektorientiert (Object-oriented)
- Prozedural (Procederal)
- Ereignis-getrieben (Event-driven)

> Jedes Paradigma hat eigene Regeln wie der Code strukturiert wird um Problem zu lösen

> Zusammengefasst: Funktionale Programmierung zerlegt ein Problem in viele kleine, wiederverwendbare Funktionen die einfach nur eine Eingabe in eine Ausgabe verwandeln. Sie VERÄNDERN Eingabe-Daten aber NICHT.

Diese kleinen, wiederverwendbaen Funktionen sind:

- prägnanter
- leichter zu debuggen
- leichter zu testen
- skalierbarer (da Funktionen parallel + damit auf mehrere Prozessorkerne verteilt, ausgeführt werden können)

### 1.2. First-class-Citizen

> Alle Funktionen in Javascript sind Funktionen erster Klasse, dh. man kann sie wie alle anderen Variablen verwenden.
> Sie können also:

- zu einer Variable zugewiesen
- als Argument oder
- als Rückgabewert anderer Funktionen übergeben werden.

### 1.3. Higher-Order Functions

> Wenn eine Funktion als Übergabeparameter oder als Rückgabewert statt primitiven Datentypen (Zahlen, Strings, Boolean) andere Funktionen übergibt, heißen sie HIGHER ORDER FUNCTION. Sie gehen höher, da sie nur auf Funktionebene agieren.

Beispiel: map()
-> da map als Parameter andere Funktionen (meist als Arrow(=>)-Functions) akzeptiert, gehört sie zu den Higher Order Functions.

```javascript
let numbers = [1, 2, 3];
numbers.map((number) => number * 2);
```

> Arrow-Funktionen sind eine Kurzschreibweise für anonyme Funktionen.

### 1.4. Komposition von Funktion (Functional Composition)

> man speichert Funktionen, die ineinanderverschachtelt aufgerufen werden (also als Parameter voneinander) unter Variablennamen und macht den verschachtelten Aufruf nur mit den Varaiblennamen.

```javascript
let input = "   Javascript    ";
let output = "<div" + input.trim() + "</div>";

const trim = (str) => str.trim();
const wrapInDiv = (str) => `<div>${str}</div>`;

const result = wrapInDiv(trim(input)); //=> functional Composition
```

> Zwei Nachteile:
>
> - 1. Funktionale Kompositionen wie `wrapInDiv(trim(input))` muss man von rechts nach links lesen um sie zu verstehen
> - 2. Funktionale Kompositionen können so komplex werden dass viele runde Klammern nötig werden, was die Lesbarkeit erschwert

=> Lösung für 1.: Piping (`pipe()` aus JS-Bib. Lodash)
=> Lösung für 2. Composing (`compose()` aus JS-Bib. Lodash)

#### 1.4.1 Komposition und Kanalisieren von Funktionen (Composing and Piping)

> Composing und Piping vereinfacht den Code, in dem sie Klammerverschachtelung reduzieren (compose()) und Leserichtung korrigieren (pipe()).

_(Siehe: https://lodash.com/, Download: https://www.npmjs.com/package/lodash)_

##### 1.4.1.1 Lodash installieren:

im Projektordner: `$npm i lodash`

##### 1.4.1.2 compose() und pipe() aus Lodash-Bib. in JS-Dateien importieren

`import { compose, pipe } from 'lodash/fp'`

```javascript
//ohne compose()
const result = wrapInDiv(toLowerCase(trim(input)));

// mit compose (besser lesbar da keine verschachtelten Übergabeparameteraufrufe zu einem Rattenschwanz an Klammern führt)
const transform = compose(wrapInDiv, toLowerCase, trim);
transform(input);

// weiterhin bestehendes Problem: Leserichtung ist immernoch von rechts nach links daher methode pipe()
const transform = pipe(trim, toLowerCase, wrapInDiv);
transform(input);
```

### 1.5. Currying (eine funktioanale Programmiertechnik)

_(benannt nach Huskell Curry, amerikanischer Logiker + Mathematiker)_

> Beim Currying werden Funktionen mit beliebig vielen Übergabeparametern zu mehreren, verschachtelten Funktionen mit jeweils nur einem Übergabeparameter konvertiert.

```javascript
let input = "   Javascript    ";
let output = "<div" + input.trim() + "</div>";

const trim = (str) => str.trim();
const wrapInDiv = (str) => `<div>${str}</div>`; //1.
const wrapInSpan = (str) => `<span>${str}</span>`; // 2. NEU
// => Problem 1. + 2. sind fast gleich (bis auf span + div) besser wäre es Funktion zu parametrisieren (parameterize)
const result = wrapInDiv(trim(input)); //=> functional Composition
```

Parametrisieren:

```javascript
...
const trim = str => str.trim();
// ALT: const wrapInSpan = str => `<span>${str}</span>`
const wrap = (type, str) => `<${type}>${str}</${type}>` //Neu: parametrisiert
const toLowerCase = str => str.toLowerCase()
const transform = pipe(trim, toLowerCase, wrap)
//Problem: wrap braucht zwei Übergabeparameter, der zweite (str) kann aber noch nicht angegeben werden
console.log(transform(input));
```

Currying Beispiel

```javascript
// ohne Currying
function add(a, b) {
  return a + b;
}

const add1 = add(1);
add1(5);

// mit Curring
function add(a) {
  function add(b) {
    return a + b;
  }
}

const add2 = (a) => (b) => a + b; // Trennung der Parmete durch Pfeile (=>) ghört zu Currying

add(1)(5); //anstelle von add(1,5) // Parameteraufzählung in einzelnen Klammerpaaren ohne Kommas gehört zu Currying
```

Currying am Augangsbeispiel:

```javascript
const trim = (str) => str.trim();
const wrap = (type) => (str) => `<${type}>${str}</${type}>`;
//-> hier Currying;  ALT: const wrap = (type, str) => `<${type}>${str}</${type}>`
const toLowerCase = (str) => str.toLowerCase();
const transform = pipe(trim, toLowerCase, wrap("div")); //-> statt div können hier beliebig andere html-Elemente eingesetzt werden. Der Aufruf div löst den Aufruf einer Funktion (str => `<${type}>${str}</${type}>`) aus, nicht der eines primitiven Datenwertes
console.log(transform(input));
```

### 1.6. Eigenschaften von Pure Functions

> Jede Eingabe eines Bestimmten Wertes ergibt immer denselben bestimmten Rückgabewertwert. Pure Functions sind als deterministisch: daher kömmen dort keine:

- Randomwerte
- keine aktuellen Datum-/Zeitwerte
- keine globalen Stati (DOM, Dateien, Datenbanken etc)
- keine Veränderung von Parametern
  verarbeitet werden.

> In Redux sind die Reducer als Pure Functions programmiert

Beispiel Pure vs impure:

```javascript
// impure
function isEligible(age) {
  return age > minAge;
}
// da "minAge" nicht hier deklariert wurde, ist es eine globale Variable, diese ist außerhalb dieser Funktion veränderbar, daher ist die Funktion impure.

// pure, da alles was die Funktion braucht bei ihrem Aufruf angegeben werden muss
function isEligible(age, minAge) {
  return age > minAge;
}
```

#### 1.6.1 Vorteile von Pure functions

- Selbst dokumentierend
- Leicht testbar
- Parallelität (Concurrency)
- Speicherbar im Cache (cacheable, da sie )

### 1.7. Unveränderlichkeit (Immutability)

> Ein objekt ist nicht direkt, sondern nur über Kopie seiner selbst veränderbar

Beipiel:

```javascript
// unveränderlich
let name = "Mosh";
let newName = name.toUpperCase();

// veränderlich:
let book = {};
book.title = "...";

// ACHTUNG: const macht etwas nicht unveränderlich sondern verhindert nur eine Neudeklaration einer Variable
const book = {};
book.title = "..."; // book kann sein Wert noch ändern aber...
book = {}; //-> Fehler ; ... Neudeklaration (reassignment) von book wird durch const verhindert
```

#### 1.7.1. Vorteile der Unveränderlichkeit

- Vorhersagbarkeit (Predictability)
- schnelleres Erkennen von Veränderungen (Faster Change Detection)
- Parallelität (Concurrency)

#### 1.7.2. Nachteile der Unveränderlichkeit

- Performance (da bei jeder Objektänderung alle Werte zum neuen Objekt kopiert werden; Wird sich nur bei vielen (mehreren 1000 Objekten))
- Speicherlast (Memory Overhead) dagegen gibt es aber js-bibliotheken für "Structural sharing"

### 1.8. Aktualisieren von Objekten und Arrays

#### 1.8.1 Objekte aktualisieren (Updating Objects)

Video bei 42:22
_(Themen Spread Operator, deep Copy)_
...

#### 1.8.2 Arrays aktualisieren (Updating Arrays)

Video bei 45:56
_(Themen indexOf(), slice(), filter(), map())_
...

### 1.9. Unveränderlichkeit durchsetzen(Enforcing Immutability)

> geht mithilfe von Js-Bibs wie:

- Immutable (von Facebook)
- Immer (beliebt, Arbeitete mit nacke JS-Objekten)
- Mori

#### 1.9.1 Immutable()

_(Installation, Import )_

...

#### 1.9.2 Immer()

_(Installation, Import)_

...

##2. Redux

## 2.1 Redux-Architektur
Begriff | Erklärung
--|--
Store| Dort werden alle Zustandswerte (States) der Applikation als Javascript-Objekte geschpeichert (Single-Source-of-Truth). Alle Bereiche der UI haben Zugriff darauf. 
State| Zustandswert der in Store gespeichert wird. States können nicht direkt geändert werden, sondern nur über eine spezielle Form von Funktionen, den Reducern.
Reducer | Funktion für Aktualisierung von State-Werten. Immer als "pure function" programmiert (Sie oben "1.6 Pure Functions")
action | Ereignis das das update der Stordaten auslöst. Es wird als Parameter beim Aufruf des Reducers übergeben.


### 2.1.1 Store und States

Beispiel für Store-JS-Objekt:
```javascript
{
cateories: [],
products: [],
cart: {},
user: {}
}
```

### 2.1.2 Reducer

> hat die Funktion eines Event Handlers

```javascript
function reducer (store, action){
  const updated = {...store}
}
``` 

> Frage: Woher weiß der Store welche Zustandswerte er genau aktualisieren soll? `(Antwort: durch "action", als Übergabeparameter)`

## 2.2 Redux Projekt erstellen
> 4 Schritte:

 xx | xx  
--|--
1. Store entwerfen | Welche Daten sollen im Store gespeichert werden?
2. Events/Actions definieren | Welche Ereignisse  kann der User in der App auslösen?
3. Reducer erstellen | Einen oder mehrere Reducer erstellen
4. Store aufsetzen | Store wird basierend auf Reducer erstellt
     
> Als erstes muss redux dem Projektordner hinzugefügt werden:
> `$ npm i redux@4.0` 

### 2.2.1 Design Store (am Beispiel einer Bugtracking App)

```javascript
[
  {
    id: 1,
    description: "a",
    resolved: false
  },
  { id: 2,
    description: "b",
    resolved: true
  },
  { id: 3,
    description: "c",
    resolved: false
  },
]
```

### 2.2.1 Aktionen definieren

User können: 
* Bug hinzufügen (Add a bug)
* als gelöst markieren (Mark as Resolved)
* Bug löschen (Delete Bug)

> Eine Aktion ist eine einfaches JS-Objekt, welches beschreibt was passiert ist

Beispiel Aktion-Objekt:

```javascript
{
  type: "ADD_BUG", //type muss angegeben werden, sonst meckert Redux
  description: "..."
}
```
oder:
```javascript
{
  type: "bugRemoved",
  payload: {
    id: 1
  }
}
```


### 2.2.2 Reducer erstellen
 _Datei "reducer.js" im Ordner "src" mit folgendem Inhalt erstellen:_


```javascript
function reducer (state =[], action) { // =[] leeres Array dient als initial State damit der store anfangs nicht undefiend ist 
    if (action.type === 'bugAdded')
    return [
        ...state,
        {
            id: ++lastId,
            description: action.payload.description,
            resolved:false 
        }
    ];

else if (action.type === 'bugRemoved')
    return state.filter(bug => bug.id !==action.playload.id) // alle bugs außer der mit gegebener Id 

    return state // aktueller State falls filtern nicht klappt, ohne diese Zeile würde app bei filterproblem haken

}
```


Dasselbe nochmal mit **switch-case Implementierung** statt **if**: 
```javascript
function reducer (state =[], action) {

  switch (action.type) {
    case "bugAdded": 
      return [
        ...state,
        {
            id: ++lastId,
            description: action.payload.description,
            resolved:false 
        }
    ];
    case "bugRemoved":
          return state.filter(bug => bug.id !==action.payload.id) 
    default: return state
  }
}
```
### 2.2.3. Store ...

#### 2.2.3.1 ... erstellen
 _Datei "store.js" im Ordner "src" mit folgendem Inhalt erstellen:_
```javascript
import { create Store } from 'redux'
import reducer from './reducer' // reducer.js wird mit "export DEFAULT" exportiert, dahier ist hier beim importieren keine geschweifte Klammerung nötig

const store = createStore(reducer) // ist ne Higher Order Function

export default store // Export wichtig um es in Hauptapplikation verwenden zu können

```
#### 2.2.3.2 ... benutzen
_Datei "index.js"_
```javascript

import store from './store' // keine geschwungenen Klammern da "export default"

//const unsubscribe = // unsubscribe() ///->einblenden um unsubscribing zu simulieren

  store.subscribe(() => {
    console.log ("Store changed!", store.getState());
    
    })

store.dispatch({
  type: "bugAdded",
  payload: {
    description: "Bug1"
  }
})

// unsubscribe() ///->einblenden um unsubscribing zu simulieren, führt dazu da zweite Änderung im Store nicht mehr ausgefürt wird. Unsubscriben von Componenten ist wichtig wenn diese in der UI nicht mehr sichtbar sind

store.dispatch({
  type: "bugRemoved",
  payload: {
    id: 1
  }
})

console.log(store.getState()) // Ausgabe von aktuellen Statewerten des Stores
```

## 2.3 Action Types
Wiederholung Redux-Ablauf
> wenn  Action ausgelöst wird ruft der store einen reducer auf und übergibt ihn den aktuellen State und die auslösende Aktion.

> Abhängig vom Aktiobnstypen bekommt man einen neuen State.

Bisher haben wir die Bezeichnungen der Actiontypes hart gecodet, daher ist es schlecht wartbar. Man kann das ausbessern, indem man die ActionTypes auslagert.

### 2.3 Action Types auslagern
1. _Datei "actionTypes.js" im Ordner "src" mit folgendem Inhalt erstellen:_

```javascript
export const BUG_ADDED = "bugAdded"
export const BUG_REMOVED = "bugRemoved"
```
2. _in reducer.js Importbefehl der ActionTypes angeben_
```javascript
>> import { BUG_ADDED, BUG_REMOVED } from './actionTypes'
function reducer (state =[], action) {

  switch (action.type) {
    case BUG_ADDED: 
      return [
        ...state,
        {
            id: ++lastId,
            description: action.payload.description,
            resolved:false 
        }
    ];
    case BUG_REMOVED:
          return state.filter(bug => bug.id !==action.payload.id) 
    default: return state
  }
}

///////////////////////////////////////////////////
//oder bei sehr vielen ActionTypes:


>> import * as actions from './actionTypes'

function reducer (state =[], action) {

  switch (action.type) {
>>  case actions.BUG_ADDED:
      return [
        ...state,
        {
            id: ++lastId,
            description: action.payload.description,
            resolved:false 
        }
    ];
>>    case actions.BUG_REMOVED:
          return state.filter(bug => bug.id !==action.payload.id) 
    default: return state
  }
}
```

3. _in Datei "index.js" Importbefehl der ActionTypes angeben_

```javascript
import store from './store' 
>> import * as actions from './actionTypes'

...

```

### 2.4 Action Creators
> Ein weiteres Problem in der App ist es WIE wir eine Aktion ausliefern (how we dispatch an action)
Bisher könnte es passieren dass man ähnliche Aktionen an mehrern Stellen im Code erstellt. Es ist aber besser eine Aktion an mehreren Stellen nutzen zu können. Das erreicht man mit "Action Creators"

1. _Datei "actions.js" im Ordner "src" mit folgendem Inhalt erstellen:_

> Es gibt 2 Varianten den Action creator zu sachreiben.

**Variante 1:**
```javascript
import * as actions from './actionTypes'

export function bugAdded(description) {
    return {
        type: actions.BUG_ADDED,
        payload: {
             description // Kurzschreibweise für 'description: description'
        }
    }
}
``` 

**Variante 2:**

```javascript
import * as actions from './actionTypes'

export const bugAdded = description => ({
    
        type: actions.BUG_ADDED,
        payload: {
            description // Kurzschreibweise für 'description: description'

        }
})
```

2.  _in Datei "index.js" Importbefehl der ActionTypes entfernen bzw. auschneiden und 
```javascript
import * as actions from './actionTypes'

```
... in index.js. folgendes einfügen: 
```javascript
import  { bugAdded } from './actions'

store.dispatch(bugAdded("Bug 1")) // Aktion bugAdded() kann jetzt ganz einfach mit Seiter Description als Parameter aufgerufen werden
 
```
## 3. Ablauf Wenn man neuen Button hinzufügt:
1. in actionTypes.js neue Aktion hinzufügen zB. für einen Resolved-Button:
```javascript
    export const BUG_ADDED = "bugAdded"
    export const BUG_REMOVED = "bugRemoved"
>>  export const BUG_RESOLVED = "bugResolved"
```
2. in actions.js neue Aktion hinzufügen
```javascript
...
export const bugResolved = id => ({
    type: actions.BUG_RESOLVED,
    payload : {
        id  // Kurzschreibweise für 'id: id'
    }
})
...
```
3. in reducer.js neuen case im Switch-Case-Schleife/ If-Else-Schleife anpassen hinzfügen:

```javascript
...
else if (action.type === BUG_RESOLVED)
    return state.map(bug => 
        bug.id !==action.payload.id ? bug : {...bug, resolved: true}) // alle bug außer der mit gegebener Id 
...
```