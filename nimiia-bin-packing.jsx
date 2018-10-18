#include 'rsrc/Packer.jsx';
#include 'rsrc/utils.jsx';

/**
 * An InDesign application of simple bin packing algorithm
 * https://codeincomplete.com/posts/bin-packing/
 */

/**
 * Fonts
 */

try {
  XO = app.fonts.item('XO');
}
catch (err) {};

var nimiia = app.documents.item(0);

// with (nimiia) {
//   // var nmPage = pages.item(0);
//   var nmBounds = GetBounds(nimiia, nmPage);

//   with (nimiia.pages.item(0)) {
//     // var blocksToPack = generateBlocks(nmBounds, 10);
//     var PackerPage = new Packer(nimiia.documentPreferences.pageWidth, nimiia.documentPreferences.pageHeight, nimiia.pages.item(0));
//     PackerPage.fit(blocks);
//   }
// }

const PAGE_AMOUNT = 1;

const POWER_STEPS = 7;

for (var i = 0; i < PAGE_AMOUNT; i++) {
  with (nimiia) {
    var newPage = nimiia.pages.add();
    var outerBounds = GetOuterBounds(nimiia, newPage);
    // var blocks = generateBlocks(outerBounds, 500);
    var blocks = generateBlocksSorted(outerBounds, 2000, 100);
    // var blocks = generateBlocksPowers(outerBounds, POWER_STEPS);
    // passes
    var PackerPage = new Packer(outerBounds.width, outerBounds.height, newPage);
    PackerPage.fit(blocks);
  }
}

