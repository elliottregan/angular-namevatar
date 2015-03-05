var m;

m = angular.module("angular-namevatar", []);

angular.module("angular-namevatar").directive("namevatar", function() {
  return {
    restrict: "AC",
    link: function(scope, element, attrs) {
      scope.$watch(attrs.namevatar, function(value) {
        var ColorLuminance, color1, color2, hashString;
        hashString = function(stringToHash) {
          var chr, hash, i, len;
          i = 0;
          while (stringToHash.length < 6) {
            stringToHash = stringToHash.add(stringToHash.charAt(0));
            i++;
          }
          hash = 0;
          i = void 0;
          chr = void 0;
          len = void 0;
          if (stringToHash.length === 0) {
            return hash;
          }
          i = 0;
          len = stringToHash.length;
          while (i < len) {
            chr = stringToHash.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0;
            i++;
          }
          return hash;
        };
        ColorLuminance = function(hex, sat_override, val_override) {
          var b, chr, g, hue, i, max, min, r, sat, val;
          hex = String(hex).replace(/[^0-9a-f]/g, "");
          if (hex.length === 0) {
            hex = "" + Math.abs(hashString(attrs.namevatar).toString());
          }
          i = 0;
          while (hex.length < 6) {
            hex = hex.concat(hex.charAt(0));
            i++;
          }
          r = parseInt(hex.substring(0, 2), 16) / 255;
          g = parseInt(hex.substring(2, 4), 16) / 255;
          b = parseInt(hex.substring(4, 6), 16) / 255;
          max = Math.max.apply(Math, [r, g, b]);
          min = Math.min.apply(Math, [r, g, b]);
          chr = max - min;
          hue = 0;
          val = max;
          sat = 0;
          if (val > 0) {
            sat = chr / val;
            if (sat > 0) {
              if (r === max) {
                hue = 60 * (((g - min) - (b - min)) / chr);
                if (hue < 0) {
                  hue += 360;
                }
              } else if (g === max) {
                hue = 120 + 60 * (((b - min) - (r - min)) / chr);
              } else {
                if (b === max) {
                  hue = 240 + 60 * (((r - min) - (g - min)) / chr);
                }
              }
            }
          }
          if (typeof sat_override === "number") {
            sat = sat_override;
          }
          if (typeof val_override === "number") {
            val = val_override;
          }
          return "hsla(" + hue + "," + sat * 100 + "%," + val * 100 + "%,1)";
        };
        color1 = ColorLuminance(attrs.namevatar, 0.4, 0.70);
        color2 = ColorLuminance(attrs.namevatar, 0.4, 0.60);
        element.css("background-color", color1);
        switch (Math.abs(hashString(attrs.namevatar)).toString()[0]) {
          case "0":
            element.css("background-image", "linear-gradient(to right," + color1 + " 50%," + color2 + " 50%," + color2 + " 100%)");
            return element.css("background-size", ".5rem .5rem");
          case "1":
            return element.css({
              "background-image": "radial-gradient(circle closest-side at 30% 30%," + color1 + " 90%," + color2 + " 94%," + color2 + " 100%)",
              "background-size": "1rem 1rem"
            });
          case "2":
            return element.css({
              "background-image": "linear-gradient(135deg," + color1 + " 25%, " + color2 + " 25%, " + color2 + " 50%, " + color1 + " 50%, " + color1 + " 75%, " + color2 + " 75%, " + color2 + " 100%)",
              "background-size": "1.5rem 1.5rem"
            });
          case "3":
            return element.css({
              "background-image": "linear-gradient(45deg," + color1 + " 25%, " + color2 + " 25%, " + color2 + " 50%, " + color1 + " 50%, " + color1 + " 75%, " + color2 + " 75%, " + color2 + " 100%)," + "linear-gradient(135deg," + color1 + " 25%, " + color2 + " 25%, " + color2 + " 50%, " + color1 + " 50%, " + color1 + " 75%, " + color2 + " 75%, " + color2 + " 100%)",
              "background-size": "1.5rem 1.5rem"
            });
          case "4":
            color1 = color1.replace(",1", ",.45");
            return element.css({
              background: "linear-gradient(115deg," + color1 + " 75%, " + color2 + " 75%) 0 0," + "linear-gradient(245deg," + color1 + " 75%, " + color2 + " 75%) 0 0," + "linear-gradient(115deg," + color1 + " 75%, " + color2 + " 75%) .5rem -1rem," + "linear-gradient(245deg," + color1 + " 75%, " + color2 + " 75%) .5rem -1rem",
              "background-size": "1rem 2rem"
            });
          case "5":
            color2 = color1.replace(",1", ",.25");
            return element.css({
              background: "linear-gradient(135deg," + color1 + " 25%, " + color2 + " 25%) -.5em 0," + "linear-gradient(225deg," + color1 + " 25%, " + color2 + " 25%) -.5em 0," + "linear-gradient(315deg," + color1 + " 25%, " + color2 + " 25%)," + "linear-gradient(45deg," + color1 + " 25%, " + color2 + " 25%)",
              "background-size": "1rem 1rem"
            });
          case "6":
            color1 = color1.replace(",1", ",.5");
            color2 = color2.replace(",1", ",1");
            return element.css({
              "background-color": "red",
              background: "radial-gradient(circle at 100% 50%," + color1 + " 20%," + color2 + " 21%," + color2 + " 34%, " + color1 + " 35%," + color1 + ")," + "radial-gradient(circle at 0% 50%," + color1 + " 20%," + color2 + " 21%," + color2 + " 34%, " + color1 + " 35%," + color1 + ") 0 -1rem",
              "background-size": "1.5rem 2rem"
            });
          case "7":
            color2 = color1.replace(",1", ",.5");
            return element.css({
              background: "linear-gradient(45deg," + color1 + " 25%, " + color2 + " 25%," + color2 + " 75%," + color1 + " 75%, " + color1 + ")," + "linear-gradient(-45deg," + color1 + " 25%, " + color2 + " 25%," + color2 + " 75%," + color1 + " 75%, " + color1 + ")",
              "background-size": "1rem 1rem"
            });
          case "8":
            return element.css({
              "background-image": "linear-gradient(135deg," + color1 + " 25%, " + color2 + " 25%, " + color2 + " 50%, " + color1 + " 50%, " + color1 + " 75%, " + color2 + " 75%, " + color2 + " 100%)",
              "background-size": "1.5rem 1.5rem"
            });
          case "9":
            return element.css({
              "background-image": "linear-gradient(135deg," + color1 + " 25%, " + color2 + " 25%, " + color2 + " 50%, " + color1 + " 50%, " + color1 + " 75%, " + color2 + " 75%, " + color2 + " 100%)",
              "background-size": "1.5rem 1.5rem"
            });
          case "0":
            return element.css({
              "background-image": "linear-gradient(135deg," + color1 + " 25%, " + color2 + " 25%, " + color2 + " 50%, " + color1 + " 50%, " + color1 + " 75%, " + color2 + " 75%, " + color2 + " 100%)",
              "background-size": "1.5rem 1.5rem"
            });
        }
      });
    }
  };
});
