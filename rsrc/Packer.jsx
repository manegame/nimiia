Packer = function (outerW, outerH, page) {
  this.page = page,
  this.root = { 
    x: 0,
    y: 0,
    w: outerW,
    h: outerH
  },
  this.imageFolder = new Folder('/Volumes/Manus\ Nijhoff\ +31618975548/2018\ -\ 2019/nimiia\ cétiï/bible-mix');
  this.images = this.imageFolder.getFiles();
  this.placeSignature(page, 'Nimiia Izmibii');
}

Packer.prototype = {

  fit: function (blocks) {
    var n, node, block;
    for (n = 0; n < blocks.length; n++) {
      block = blocks[n];
      if (node = this.findNode(this.root, block.w, block.h))
        block.fit = this.splitNode(node, block.w, block.h);
      else
        block.fit = this.growNode(block.w, block.h);
    }
  },

  findNode: function (root, w, h) {
    if (root.used)
      return this.findNode(root.right, w, h) || this.findNode(root.down, w, h);
    else if ((w <= root.w) && (h <= root.h))
      return root;
    else 
      return null;
  },

  splitNode: function (node, w, h) {
    node.used   = true;
    node.down   = { x: node.x,     y: node.y + h, w: node.w,     h: node.h - h };
    node.right  = { x: node.x + w, y: node.y,     w: node.w - w, h: h          };
    this.placeNode(this.page, node, w, h);
    return node;
  },

  growNode: function(w, h) {
    var canGrowDown  = (w <= this.root.w);
    var canGrowRight = (h <= this.root.h);
    
    var shouldGrowRight = canGrowRight && (this.root.h >= (this.root.w + w)); // attempt to keep square-ish by growing right when height is much greater than width
    var shouldGrowDown  = canGrowDown  && (this.root.w >= (this.root.h + h)); // attempt to keep square-ish by growing down  when width  is much greater than height
    
    if (shouldGrowRight)
      return this.growRight(w, h);
    else if (shouldGrowDown)
      return this.growDown(w, h);
    else if (canGrowRight)
      return this.growRight(w, h);
    else if (canGrowDown)
      return this.growDown(w, h);
    else
      return null; // need to ensure sensible root starting size to avoid this happening
  },

  growRight: function(w, h) {
    this.root = {
      used: true,
      x: 0,
      y: 0,
      w: this.root.w + w,
      h: this.root.h,
      down: this.root,
      right: { 
        x: this.root.w,
        y: 0,
        w: w,
        h: this.root.h 
      }
    };
    if (node = this.findNode(this.root, w, h))
      return this.splitNode(node, w, h);
    else
      return null;
  },

  growDown: function(w, h) {
    this.root = {
      used: true,
      x: 0,
      y: 0,
      w: this.root.w,
      h: this.root.h + h,
      down:  { x: 0, y: this.root.h, w: this.root.w, h: h },
      right: this.root
    };
    if (node = this.findNode(this.root, w, h))
      return this.splitNode(node, w, h);
    else
      return null;
  },

  placeNode: function (page, node, w, h) {
    with (page) {
      var frame = textFrames.add();
      frame.geometricBounds = [
        node.y,
        node.x,
        node.y + h,
        node.x + w
      ];
      // CHOOSE WHAT TO PLACE
      var randomIndex = Math.floor(Math.random() * this.images.length);
      var randomImage = this.images[randomIndex];
      var singleImage = new File('/Users/manus/Desktop/43571560_246582716032182_7281449573795495936_n.jpg');

      frame.place(randomImage, false);

      var i = Math.random();

      if (i < 0.25) {
        frame.flipItem(Flip.VERTICAL, AnchorPoint.CENTER_ANCHOR);
      } else if (0.25 < i < 0.5) {
        frame.flipItem(Flip.HORIZONTAL, AnchorPoint.CENTER_ANCHOR);
      } else if (0.5 < i < 0.75) {
        frame.flipItem(Flip.BOTH, AnchorPoint.CENTER_ANCHOR);
      } else {
        frame.flipItem(Flip.NONE, AnchorPoint.CENTER_ANCHOR);
      }
      
      frame.fit(FitOptions.CONTENT_TO_FRAME);
      frame.fit(FitOptions.FILL_PROPORTIONALLY);
      frame.fit(FitOptions.CENTER_CONTENT);
    }
  },

  placeSignature: function(page, signature) {
    with(page) {
      var frame = textFrames.add();
      frame.geometricBounds = [
        this.root.h - 2,
        0,
        this.root.h,
        this.root.w
      ]
      frame.contents = signature;
      frame.textFramePreferences.verticalJustification = VerticalJustification.BOTTOM_ALIGN;
      var par = frame.paragraphs.item(0);
      par.appliedFont = XO;
      par.justification = Justification.centerAlign;
      par.pointSize = 4;
    }
  }
}
