m = angular.module("angular-namevatar", [])

angular.module("angular-namevatar").directive "namevatar", ->
  restrict: "AC"
  link: (scope, element, attrs) ->
    scope.$watch attrs.namevatar, (value) ->
      hashString = (stringToHash) ->

        # Ensure the string is long enough
        i = 0
        while stringToHash.length < 6
          stringToHash = stringToHash.add(stringToHash.charAt(0))
          i++
        hash = 0
        i = undefined
        chr = undefined
        len = undefined
        return hash  if stringToHash.length is 0
        i = 0
        len = stringToHash.length

        while i < len
          chr = stringToHash.charCodeAt(i)
          hash = ((hash << 5) - hash) + chr
          hash |= 0 # Convert to 32bit integer
          i++
        hash
      ColorLuminance = (hex, sat_override, val_override) ->

        # validate hex string
        hex = String(hex).replace(/[^0-9a-f]/g, "")

        # if none of the characters can be used, we has the original string to get all numbers.
        hex = "" + Math.abs(hashString(attrs.namevatar).toString())  if hex.length is 0

        # Ensure the string is long enough
        i = 0
        while hex.length < 6
          hex = hex.concat(hex.charAt(0))
          i++

        # convert to HSL
        r = parseInt(hex.substring(0, 2), 16) / 255
        g = parseInt(hex.substring(2, 4), 16) / 255
        b = parseInt(hex.substring(4, 6), 16) / 255
        max = Math.max.apply(Math, [
          r
          g
          b
        ])
        min = Math.min.apply(Math, [
          r
          g
          b
        ])
        chr = max - min
        hue = 0
        val = max
        sat = 0
        if val > 0
          sat = chr / val
          if sat > 0
            if r is max
              hue = 60 * (((g - min) - (b - min)) / chr)
              hue += 360  if hue < 0
            else if g is max
              hue = 120 + 60 * (((b - min) - (r - min)) / chr)
            else hue = 240 + 60 * (((r - min) - (g - min)) / chr)  if b is max
        sat = sat_override  if typeof sat_override is "number"
        val = val_override  if typeof val_override is "number"
        "hsla(" + hue + "," + sat * 100 + "%," + val * 100 + "%,1)"
      color1 = ColorLuminance(attrs.namevatar, 0.4, 0.70)
      color2 = ColorLuminance(attrs.namevatar, 0.4, 0.60)
      element.css "background-color", color1
      switch Math.abs(hashString(attrs.namevatar)).toString()[0]
        when "0" # vertical lines
          element.css "background-image", "linear-gradient(to right," + color1 + " 50%," + color2 + " 50%," + color2 + " 100%)"
          element.css "background-size", ".5rem .5rem"
        when "1" # dots
          element.css
            "background-image": "radial-gradient(circle closest-side at 30% 30%," + color1 + " 90%," + color2 + " 94%," + color2 + " 100%)"
            "background-size": "1rem 1rem"

        when "2" #diagonal lines
          element.css
            "background-image": "linear-gradient(135deg," + color1 + " 25%, " + color2 + " 25%, " + color2 + " 50%, " + color1 + " 50%, " + color1 + " 75%, " + color2 + " 75%, " + color2 + " 100%)"
            "background-size": "1.5rem 1.5rem"

        when "3" # angled checkers *** needs transparent colors
          element.css
            "background-image": "linear-gradient(45deg," + color1 + " 25%, " + color2 + " 25%, " + color2 + " 50%, " + color1 + " 50%, " + color1 + " 75%, " + color2 + " 75%, " + color2 + " 100%)," + "linear-gradient(135deg," + color1 + " 25%, " + color2 + " 25%, " + color2 + " 50%, " + color1 + " 50%, " + color1 + " 75%, " + color2 + " 75%, " + color2 + " 100%)"
            "background-size": "1.5rem 1.5rem"

        when "4" # triangles
          color1 = color1.replace(",1", ",.45")
          element.css
            background: "linear-gradient(115deg," + color1 + " 75%, " + color2 + " 75%) 0 0," + "linear-gradient(245deg," + color1 + " 75%, " + color2 + " 75%) 0 0," + "linear-gradient(115deg," + color1 + " 75%, " + color2 + " 75%) .5rem -1rem," + "linear-gradient(245deg," + color1 + " 75%, " + color2 + " 75%) .5rem -1rem"
            "background-size": "1rem 2rem"

        when "5" # horizontal zig-zags
          color2 = color1.replace(",1", ",.25")
          element.css
            background: "linear-gradient(135deg," + color1 + " 25%, " + color2 + " 25%) -.5em 0," + "linear-gradient(225deg," + color1 + " 25%, " + color2 + " 25%) -.5em 0," + "linear-gradient(315deg," + color1 + " 25%, " + color2 + " 25%)," + "linear-gradient(45deg," + color1 + " 25%, " + color2 + " 25%)"
            "background-size": "1rem 1rem"

        when "6" # waves ***needs a solid background to make it darker
          color1 = color1.replace(",1", ",.5")
          color2 = color2.replace(",1", ",1")
          element.css
            "background-color": "red"
            background: "radial-gradient(circle at 100% 50%," + color1 + " 20%," + color2 + " 21%," + color2 + " 34%, " + color1 + " 35%," + color1 + ")," + "radial-gradient(circle at 0% 50%," + color1 + " 20%," + color2 + " 21%," + color2 + " 34%, " + color1 + " 35%," + color1 + ") 0 -1rem"
            "background-size": "1.5rem 2rem"

        when "7" # diagonal checkers
          color2 = color1.replace(",1", ",.5")
          element.css
            background: "linear-gradient(45deg," + color1 + " 25%, " + color2 + " 25%," + color2 + " 75%," + color1 + " 75%, " + color1 + ")," + "linear-gradient(-45deg," + color1 + " 25%, " + color2 + " 25%," + color2 + " 75%," + color1 + " 75%, " + color1 + ")"
            "background-size": "1rem 1rem"

        when "8" #diagonal lines
          element.css
            "background-image": "linear-gradient(135deg," + color1 + " 25%, " + color2 + " 25%, " + color2 + " 50%, " + color1 + " 50%, " + color1 + " 75%, " + color2 + " 75%, " + color2 + " 100%)"
            "background-size": "1.5rem 1.5rem"

        when "9" #diagonal lines
          element.css
            "background-image": "linear-gradient(135deg," + color1 + " 25%, " + color2 + " 25%, " + color2 + " 50%, " + color1 + " 50%, " + color1 + " 75%, " + color2 + " 75%, " + color2 + " 100%)"
            "background-size": "1.5rem 1.5rem"

        when "0" #diagonal lines
          element.css
            "background-image": "linear-gradient(135deg," + color1 + " 25%, " + color2 + " 25%, " + color2 + " 50%, " + color1 + " 50%, " + color1 + " 75%, " + color2 + " 75%, " + color2 + " 100%)"
            "background-size": "1.5rem 1.5rem"


    return
