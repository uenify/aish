# Aish
Github Releases Getter

This project lets you display latest release of your project using GitHub.

It's a React app which gets latest release in repository using GitHub API

## Usage

Firstly, you need to clone this repository
```bash
$ git clone https://github.com/uenify/aish
```
Don't forget to install dependencies
```bash
$ npm install
```

Then you need to create `config.json`
```json
{   
    "user": "YOUR_PROFILE",
    "repo": "YOUR_REPO",
    "platforms": [
        "mac",
        "win"
    ]
}
```

List of available platforms:
- `mac` - macOS
- `win` - Windows
- `deb` - Debian
- `linux` - Linux

Create build
```bash
$ npm run build
```

Upload build to your server