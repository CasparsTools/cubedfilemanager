# CubedFileManager

CubedFileManager is a tool made for auto uploading your files to the Cubedcraft playerservers. It is mainly made for skript and the default settings (no parameters) will make it ready for skript use.

## Installation

Make sure you have [nodeJS](https://nodejs.org/en/download/) installed. After that run the following command in a command terminal:

```bash
npm install cubedfilemanager -g
```

## Usage

To use the package. Open the command terminal, and type
```bash
cd <directory>
```
After doing this you should be in the folder where your scripts are located at / where you want to make them.

#### Starting without manually grabbing the cookie.

If you dont want to get the PHPSESSID yourself, you can start the system with 
```bash
cfm . 
```

If you are starting the system for the first time it will instantly promt your login details. After you entered them it will ask you if you want to save the credentials. These credentials are saved encrypted to make sure they cannot be easily stolen by a different system.

A unique encryption key is generated once you start the software, so even if you leak the details they still cannot do anything without the encryption key.

If you have your credentials saved and start the system, it will ask if you want to log in with those credentials, change the credentials or log in with a different account.


#### Starting by grabbbing the cookie yourself.

If you want to get the token yourself, you may follow the steps below.

go to the [Playerservers File manager](https://playerservers.com/dashboard/filemanager) and look for the cookie called PHPSESSID. Copy the content of it. 


To start the program, execute the following:

```bash
cfm . --session=<phpsessid here>
```

It will check if the token is valid, and install the required script if it doesnt exist already.
When finished it will show you the dashboard url.

### What happens next?
When creating / saving / deleting a file, it will do the same on your file manager and send a message ingame when done.

## Reporting issues

You can report issues to me by sending me a dm in discord (Supercrafter100#6600). I am always open for suggestions for it.

## Changelog

version 2.0.9:

- Added an error logger for files. To enable it, add the flag `--logerrors=true` to your start command. For example

```bash
cfm . --logerrors=true
```


