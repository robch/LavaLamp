import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "lavalamp" is now active!');

  const treeDataProvider = new LavaLampTreeViewProvider();
  const treeView = vscode.window.createTreeView('lavaLampTreeView', {
    treeDataProvider,
  });

  context.subscriptions.push(vscode.commands.registerCommand('lavalamp.hello', () => {
    vscode.window.showInformationMessage('Hello World from LavaLamp in VS Code! --jac');
  }));

  context.subscriptions.push(vscode.commands.registerCommand('lavalamp.launch', () => {
    vscode.env.openExternal(vscode.Uri.parse('https://crbn.us/lava.html'));
  }));

  context.subscriptions.push(vscode.commands.registerCommand('lavalamp.show', () => {
    const panel = vscode.window.createWebviewPanel(
      'lavaLampView',
      'Lava Lamp',
      vscode.ViewColumn.Beside,
      {}
    );

    const content = getWebviewContent();
    panel.webview.html = content;
    panel.webview.options = {
      enableScripts: true,
    };

  }));
}

function getWebviewContent() {
  // Create and return the HTML content to display in the WebView
  return `
	<!DOCTYPE html>
	<html lang="en">
	<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Lava Lamp Animation</title>
			<style>
					body {
            padding: 0;
						margin: 0;
            overflow: hidden;
            background-color: rgb(35, 35, 35);
					}
					#canvasContainer {
							position: relative;
					}
					#controlsContainer {
							position: absolute;
							top: 30px;
							left: 30px;
							height: 150px;
							width: 150px;
							z-index: 2;
							padding: 10px;
							background-color: rgb(40,40,40);
							color: white;
							border: none;
							cursor: pointer;
							opacity: 0;
							transition: .4s;
					}
					#controlsContainer:hover {
							transition: .4s;
							opacity: 0.7;
					}
					.inputRange {
							width: 140px;
							height: 25px;
					}
					#numBallsRange {
							
					}
					#ballSpeedRange {
	
					}
			</style>
			</head>
	<body>
			
			
			<div id="canvasContainer">
					
					<canvas id="lavaLamp"></canvas>
					<div id="controlsContainer">
							<button>Balls: </button>
							<input type="range" min="1" max="100" class="inputRange" id="numBallsRange">
	
							<button>Ball speed:</button>
							<input type="range" min="1" max="70" class="inputRange" id="ballSpeedRange">
	
							<button>Ball size:</button>
							<input type="range" min="1" max="100" class="inputRange">
	
							<button>Use colors?</button>
							<input type="checkbox" id="useColorsCheckbox">
							<input type="color" class="inputRange" id="colorPickerInput">
	
							<button id="ColorVarianceButton ">Color variance</button>
							<input type="range" min="0" max="255" class="inputRange" id="colorVarianceInput">
					</div>
					
			</div>
			<script>
			const canvas = document.getElementById('lavaLamp');
			const ctx = canvas.getContext('2d');
			
			let numBalls = 10;
			let speedMultiplier = .2;
			let opacity = 0.7;
			
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
			
			let blobs = [];
			
			class Blob {
					constructor(x, y, radius, color) {
					this.x = x;
					this.y = y;
					this.radius = radius;
					this.color = color;
					this.speedX = (Math.random() * 2 - 1) * speedMultiplier;
					this.speedY = (Math.random() * 2 - 1) * speedMultiplier;
					}
					
					move() {
							this.x += this.speedX;
							this.y += this.speedY;
							
							// check collision
							if (this.x < this.radius || this.x > canvas.width - this.radius) {
									this.speedX *= -1;
							}
							if (this.y < this.radius || this.y > canvas.height - this.radius) {
									this.speedY *= -1;
							}
			
							// check super collision
							if (this.x < this.radius - speedMultiplier || this.x > canvas.width - this.radius + speedMultiplier) {
									this.x = this.radius * 2;
							}
							if (this.y < this.radius - speedMultiplier || this.y > canvas.height - this.radius + speedMultiplier) {
									this.y = this.radius * 2;
							}
			
							// Check collision with other blobs
							// for (const otherBlob of blobs) {
							//     if (otherBlob !== this) {
							//         const dx = this.x - otherBlob.x;
							//         const dy = this.y - otherBlob.y;
							//         const distance = Math.sqrt(dx * dx + dy * dy);
							//         const minDistance = this.radius + otherBlob.radius;
			
							//         if (distance < minDistance) {
							//             // Calculate collision response
							//             const angle = Math.atan2(dy, dx);
							//             const targetX = this.x + Math.cos(angle);
							//             const targetY = this.y + Math.sin(angle);
			
							//             const ax = (targetX - otherBlob.x) * 0.05;
							//             const ay = (targetY - otherBlob.y) * 0.05;
			
							//             this.speedX += ax;
							//             this.speedY += ay;
													
							//             otherBlob.speedX -= ax;
							//             otherBlob.speedY -= ay;
							//         }
							//     }
							// }
					}
					
					draw() {
							ctx.beginPath();
							ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
							ctx.fillStyle = this.color;
							ctx.fill();
			
							ctx.beginPath();
							ctx.arc(this.x + this.radius / 2, this.y - this.radius/2, this.radius / 6, 0, Math.PI * 2);
							ctx.fillStyle = "Smoke";
							ctx.fill();
					}
			}
			
			function createBlobs() {
					for (let i = 0; i < numBalls; i++) {
							createBlob();
					}
			}
			
			function createBlob() {
					let x2 = Math.random() * canvas.width;
					let y2 = Math.random() * canvas.height;
					const radius = Math.random() * 50 + 20;
					if (x2 < radius * 2) {
							x2 = radius + 1;
					}
					if (y2 < radius * 2) {
							y2 = radius * 2 + 1;
					}
					if (x2 > canvas.width - radius * 2) {
							x2 = canvas.width - radius * 2 - 1;
					}
					if (y2 > canvas.height - radius * 2) {
							y2 = canvas.height - radius * 2 - 1;
					}
			
					const x = x2;
					const y = y2;
			
					if (useColorsBool) {
							const baseRed = parseInt(colorPicker.value.slice(1, 3), 16);
							const baseGreen = parseInt(colorPicker.value.slice(3, 5), 16);
							const baseBlue = parseInt(colorPicker.value.slice(5, 7), 16);
			
							const colorVariance = document.getElementById("colorVarianceInput").value; // Adjust this value to control the amount of variance
			
							// Calculate random offsets for each color channel
							const redOffset = Math.floor(Math.random() * (2 * colorVariance + 1) - colorVariance);
							const greenOffset = Math.floor(Math.random() * (2 * colorVariance + 1) - colorVariance);
							const blueOffset = Math.floor(Math.random() * (2 * colorVariance + 1) - colorVariance);
			
							// Apply the offsets to the base color values
							const newRed = Math.min(255, Math.max(0, baseRed + redOffset));
							const newGreen = Math.min(255, Math.max(0, baseGreen + greenOffset));
							const newBlue = Math.min(255, Math.max(0, baseBlue + blueOffset));
			
							let red = Math.random() * 255;
							let green = Math.random() * 255;
							let blue = Math.random() * 255;

							this.color = 'rgba(' + red + ',' + green + ',' + blue + ',' + opacity + ')';
					} else {

							let red = Math.random() * 255;
							let green = Math.random() * 255;
							let blue = Math.random() * 255;

							this.color = 'rgba(' + red + ',' + green + ',' + blue + ',' + opacity + ')';
					}
			
			
			
					blobs.push(new Blob(x, y, radius, color));
			}
			
			function animate() {
					ctx.clearRect(0, 0, canvas.width, canvas.height);
					
					for (const blob of blobs) {
							blob.move();
							blob.draw();
					}
					
					requestAnimationFrame(animate);
			
			}
			
			function resizeCanvas() {
					canvas.width = window.innerWidth;
					canvas.height = window.innerHeight;
			
					for (const blob of blobs) {
							if (blob.x > canvas.width || blob.y > canvas.height) {
									blob.x = Math.random() * canvas.width;
									blob.y = Math.random() * canvas.height;
							}
					}
			}
			window.addEventListener('resize', resizeCanvas);
			
			var slider = document.getElementById("numBallsRange");
			slider.value = numBalls;
			slider.oninput = function() {
					numBalls = slider.value;
					while (blobs.length > slider.value) {
							blobs.pop();
					}
					while (blobs.length < slider.value) {
							createBlob();
					}
			}
			
			var ballSpeedSlider = document.getElementById("ballSpeedRange");
			ballSpeedSlider.value = numBalls;
			ballSpeedSlider.oninput = function() {
					for(const blob of blobs) {
							blob.speedX /= speedMultiplier;
							blob.speedY /= speedMultiplier;
					}
					speedMultiplier = ballSpeedSlider.value / 10;
			
					for(const blob of blobs) {
							blob.speedX *= speedMultiplier;
							blob.speedY *= speedMultiplier;
					}
			}
			
			
			
			var colorPicker = document.getElementById("colorPickerInput");
			colorPicker.oninput = function() {
					UseSpecialColors();
			}
			
			var colorVarianceSlider = document.getElementById("colorVarianceInput")
			colorVarianceSlider.oninput = function() {
					UseSpecialColors();
			}
			
			var useColorsCheckbox = document.getElementById("useColorsCheckbox");
			useColorsCheckbox.value = false;
			var useColorsBool = false;
			useColorsCheckbox.oninput = function() {
					useColorsBool = !useColorsBool;
					if (useColorsBool) {
							UseSpecialColors();
					} else {
							for (const blob of blobs) {
								let red = Math.random() * 255;
								let green = Math.random() * 255;
								let blue = Math.random() * 255;
	
   							blob.color = 'rgba(' + red + ',' + green + ',' + blue + ',' + opacity + ')';
							}
					}
			}
			
			function UseSpecialColors() {
					if (!useColorsBool) {
							return;
					}
					for(const blob of blobs) {
							const baseRed = parseInt(colorPicker.value.slice(1, 3), 16);
							const baseGreen = parseInt(colorPicker.value.slice(3, 5), 16);
							const baseBlue = parseInt(colorPicker.value.slice(5, 7), 16);
			
							const colorVariance = document.getElementById("colorVarianceInput").value; // Adjust this value to control the amount of variance
			
							// Calculate random offsets for each color channel
							const redOffset = Math.floor(Math.random() * (2 * colorVariance + 1) - colorVariance);
							const greenOffset = Math.floor(Math.random() * (2 * colorVariance + 1) - colorVariance);
							const blueOffset = Math.floor(Math.random() * (2 * colorVariance + 1) - colorVariance);
			
							// Apply the offsets to the base color values
							const newRed = Math.min(255, Math.max(0, baseRed + redOffset));
							const newGreen = Math.min(255, Math.max(0, baseGreen + greenOffset));
							const newBlue = Math.min(255, Math.max(0, baseBlue + blueOffset));
			
              blob.color = 'rgba(' + newRed + ',' + newGreen + ',' + newBlue + ',' + opacity + ')';
					}
			}
			
			resizeCanvas();
			createBlobs();
			animate();
		</script>
	
	</body>
	</html>
`;
}

class LavaLampTreeViewProvider implements vscode.TreeDataProvider<TreeItem> {
  // Implement the required methods for the TreeDataProvider interface
  onDidChangeTreeData?: vscode.Event<TreeItem | null | undefined>;

  getTreeItem(element: TreeItem): vscode.TreeItem {
    return element;
  }

  getChildren(element?: TreeItem): Thenable<TreeItem[]> {

    var showEmptyView = true;
    if (showEmptyView) {
      return Promise.resolve([]);
    }

    return Promise.resolve([new TreeItem("lavaLamp", "I'm a lava lamp")]);
  }
}

class TreeItem extends vscode.TreeItem {
  constructor(public readonly label: string, public readonly description: string) {
    super(label);
  }
}