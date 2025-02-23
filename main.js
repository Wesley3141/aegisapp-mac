const { app, BrowserWindow, Menu } = require('electron');

const isDev = process.env.NODE_ENV === 'development';

let mainWindow;

app.on('ready', () => {
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true
		}
	});

	mainWindow.loadFile('index.html');

	const menuTemplate = [
		{
			label: 'File',
			submenu: [
				{ role: 'quit' }
			]
		},
		{
			label: 'Edit',
			submenu: [
				{ role: 'undo' },
				{ role: 'redo' },
				{ type: 'separator' },
				{ role: 'cut' },
				{ role: 'copy' },
				{ role: 'paste' }
			]
		},
		{
			label: 'View',
			submenu: [
				{ role: 'togglefullscreen' },
				...(
					isDev ? [
						{ role: 'reload' },
						{ role: 'forceReload' }
					] : []
				),
				{ role: 'toggledevtools' }
			]
		}
	];

	const menu = Menu.buildFromTemplate(menuTemplate);
	Menu.setApplicationMenu(menu);
});
