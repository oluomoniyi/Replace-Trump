//credit goes to Steven Frank of Cloud to Butt (https://github.com/panicsteve/cloud-to-butt/) and also Lauren Orsini https://github.com/laurenorsini/caaaaarbs/blob/master/myscript.js

//add blocked sites - these sites have been trumpanated
if (
  JSON.stringify(window.location).indexOf("https://twitter.com") > 0 ||
  JSON.stringify(window.location).indexOf("https://www.facebook.com/") > 0
) {
  //do nothing
  console.log("nothing");
} else {
  walk(document.body);

  function walk(node) {
    // I stole this from Lauren https://goo.gl/106EYT,
    // who stole it from here http://is.gd/mwZp7E,
    // who ever said there is no honour amongst thieves

    var child, next;

    switch (node.nodeType) {
      case 1:
      case 9:
      case 11:
        child = node.firstChild;
        while (child) {
          next = child.nextSibling;
          walk(child);
          child = next;
        }
        break;

      case 3:
        //handleText(node, "Test");
        chrome.storage.sync.get("value", function(obj) {
          if (!chrome.runtime.error) {
            handleText(node, obj.value);
            //console.log(obj.value);
          }
        });
        break;
    }
  }

  function handleText(textNode, Alternate) {
    AlternateVal = function() {
      if (Alternate) {
        return Alternate;
      } else {
        return "ChangeMe";
      }
    };
    var v = textNode.nodeValue;

    v = v.replace(/\bTrump\b/g, AlternateVal);

    textNode.nodeValue = v;
  }
}
