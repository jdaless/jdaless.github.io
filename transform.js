const specialCases = 
{
    "\u{1d49d}": "\u212c",
    "\u{1d4a0}": "\u2130",
    "\u{1d4a1}": "\u2131",
    "\u{1d4a3}": "\u210b",
    "\u{1d4a4}": "\u2110",
    "\u{1d4a7}": "\u2112",
    "\u{1d4a8}": "\u2133",
    "\u{1d4ad}": "\u211b",
    "\u{1d506}": "\u212d",
    "\u{1d50b}": "\u210c",
    "\u{1d50c}": "\u2111",
    "\u{1d515}": "\u211c",
    "\u{1d51d}": "\u2128",
    "\u{1d53a}": "\u2102",
    "\u{1d53f}": "\u210d",
    "\u{1d545}": "\u2115",
    "\u{1d547}": "\u2119",
    "\u{1d548}": "\u211a",
    "\u{1d549}": "\u211d",
    "\u{1d551}": "\u2124",
    "\u{1d455}": "\u210e",
    "\u{1d4ba}": "\u212f",
    "\u{1d4bc}": "\u210a",
    "\u{1d4c4}": "\u2134"
}


function transform(c)
{
    document.getElementById("out").value = ''
    var unhat = document.getElementById("in").value
        .replace("\u0109","\u0302c")
        .replace("\u011d","\u0302g")
        .replace("\u0125","\u0302h")
        .replace("\u0135","\u0302j")
        .replace("\u015d","\u0302s")
        .replace("\u016d","\u0306u")
        .replace("\u0108","\u0302C")
        .replace("\u011c","\u0302G")
        .replace("\u0124","\u0302H")
        .replace("\u0134","\u0302J")
        .replace("\u015c","\u0302S")
        .replace("\u016C","\u0306U")
    unhat.split('').forEach(element => {
        if(!element.match(/[A-Za-z]/i))
            document.getElementById("out").value += element
        else if(element == element.toUpperCase())
            document.getElementById("out").value += handleSpecialCase(String.fromCodePoint(element.codePointAt() + c.codePointAt() - 'A'.codePointAt()))
        else
            document.getElementById("out").value += handleSpecialCase(String.fromCodePoint(element.codePointAt() + c.codePointAt() - 'A'.codePointAt() - 6))
    });
}

function addHat()
{
    document.getElementById("out").value = ''
    document.getElementById("in").value.split('').forEach(element => {
            document.getElementById("out").value += element
            document.getElementById("out").value += "\u0302"
        });
}

function handleSpecialCase(c)
{
    if(c in specialCases)
        return specialCases[c]
    else 
        return c
}