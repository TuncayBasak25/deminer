let wWidth  = window.innerWidth;
let wHeight = window.innerHeight;

let xGrid = 20;
let yGrid = 20;

let grid = 30;

document.body.style.backgroundColor = "black";
document.body.setAttribute('oncontextmenu', 'return false');

let gameContainer = document.createElement('div');

let gcCss = gameContainer.style;

gcCss.width = String(xGrid * grid) + "px";
gcCss.height = String(yGrid * grid) + "px";

gcCss.marginLeft = "auto";
gcCss.marginRight = "auto";

gcCss.backgroundColor = "grey";

document.body.appendChild(gameContainer);

let blockGrid = [];

for (let x = 0; x < xGrid; x++)
{
  blockGrid.push([]);
  for (let y = 0; y < yGrid; y++)
  {
    let block = document.createElement('div');

    block.style.position = "absolute";

    block.style.backgroundColor = "grey";

    block.style.width = grid + "px";
    block.style.height = grid + "px";

    block.style.left = String(x * grid) + "px";
    block.style.top  = String(y * grid) + "px";

    block.style.marginLeft = gameContainer.getBoundingClientRect().left + "px";
    block.style.marginTop = gameContainer.getBoundingClientRect().top + "px";

    block.style.outline = "3px solid black";
    block.style.outlineOffset = "-3px";

    block.style.textAlign = "center";

    if (Math.random() > 0.2) block.mine = false;
    else block.mine = true;

    block.surroundingMine = 0;

    block.x = x;
    block.y = y;

    block.setAttribute('onmousedown', 'this.isClicked()');

    block.isClicked = function ()
    {console.log(event.which);
      if (event.which === 3) this.rightClicked();
      else if (event.which === 1) this.leftClicked();
    }

    block.rightClicked = function ()
    {
      if (this.style.backgroundColor === "yellow")
      {
        this.style.backgroundColor = "grey";
      }
      else
      {
        this.style.backgroundColor = "yellow";
      }
    }

    block.leftClicked = function ()
    {
      if (this.style.backgroundColor === 'yellow') //Save
      {
        return false;
      }
      else if (this.mine === true)
      {
        this.style.backgroundColor = "red"; //Game over
        return false;
      }

      if (this.style.backgroundColor === 'white') return false; // Already checked

      this.style.backgroundColor = 'white';

      this.countSurroundingMine();

      if (this.surroundingMine === 0)
      {
        this.openSurrounding();
      }
      else
      {
        this.appendChild(document.createTextNode(this.surroundingMine));
      }
    }

    block.countSurroundingMine = function ()
    {
      if (this.x > 0 && blockGrid[this.x -1][this.y].mine === true) this.surroundingMine++;
      if (this.x < xGrid-1 && blockGrid[this.x +1][this.y].mine === true) this.surroundingMine++;
      if (this.y > 0 && blockGrid[this.x][this.y -1].mine === true) this.surroundingMine++;
      if (this.y < yGrid-1 && blockGrid[this.x][this.y +1].mine === true) this.surroundingMine++;
      if (this.x > 0 && this.y > 0 && blockGrid[this.x -1][this.y -1].mine === true) this.surroundingMine++;
      if (this.x < xGrid-1 && this.y > 0 && blockGrid[this.x +1][this.y -1].mine === true) this.surroundingMine++;
      if (this.x > 0 && this.y < yGrid-1 && blockGrid[this.x -1][this.y +1].mine === true) this.surroundingMine++;
      if (this.x < xGrid-1 && this.y < yGrid-1 && blockGrid[this.x +1][this.y +1].mine === true) this.surroundingMine++;
    }

    block.openSurrounding = function ()
    {
      if (this.x > 0) blockGrid[this.x -1][this.y].leftClicked();
      if (this.x < xGrid-1) blockGrid[this.x +1][this.y].leftClicked();
      if (this.y > 0) blockGrid[this.x][this.y -1].leftClicked();
      if (this.y < yGrid-1) blockGrid[this.x][this.y +1].leftClicked();
      if (this.x > 0 && this.y > 0) blockGrid[this.x -1][this.y -1].leftClicked();
      if (this.x < xGrid-1 && this.y > 0) blockGrid[this.x +1][this.y -1].leftClicked();
      if (this.x > 0 && this.y < yGrid-1) blockGrid[this.x -1][this.y +1].leftClicked();
      if (this.x < xGrid-1 && this.y < yGrid-1) blockGrid[this.x +1][this.y +1].leftClicked();
    }


    gameContainer.appendChild(block);

    blockGrid[x].push(block);
  }
}
