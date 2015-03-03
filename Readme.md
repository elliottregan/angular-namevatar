# angular-namevatar

An AngularJS directive to programmatically generate unique backgrounds based on a string.


## Usage

Just include the directive in your app:
```javascript
var app = angular.module('app', ['angular-namevatar'])
```

Within your view, use a string as the directive's only input:

```html
<div namevatar="{{userId1}}">{{userId1}}</div>
```

Every time a value is used, the same color and pattern will be generated.



## How it works:

The directive will add a style attribute to the element with programmatically generated `background-image` pattern and `background-color` as a fallback. There is a set of possible background patterns created with CSS, and the color and accent color are selected randomly from a palette of objectively pleasing pastels.

