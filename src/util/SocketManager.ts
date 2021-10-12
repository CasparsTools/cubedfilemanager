import CubedFileManager from "../CubedFileManager";
import { io, Socket } from "socket.io-client";
import { join } from "path";
import { existsSync, unlinkSync, writeFileSync } from "fs";
import fs from 'fs';

export default class SocketManager {

    private instance: CubedFileManager;
    private socket: Socket | undefined;

    public lastUpdatedFile: string = "";

    constructor(instance: CubedFileManager) {
        this.instance = instance;
    }

    public connect(url: string) {
        this.socket = io(url);

        this.socket.on('connect', () => this.authenticate());
    }

    private authenticate() {
        this.socket?.emit("authenticate", this.instance.sessionToken, this.instance.temp_server);
        this.socket?.on('authenticated', () => this.setEvents());
    }

    private setEvents() {
        this.socket?.on('file_create', (username, name, content, path) => this.handle_handleFileCreateEvent(username, name, content, path));
        this.socket?.on('file_edit', (username, name, content, path) => this.handle_handleFileEditEvent(username, name, content, path));
        this.socket?.on('file_delete', (username, name, path) => this.handle_handleFileDeleteEvent(username, name, path));
    }

    public write(event: string, ...data: any) {
        this.socket?.emit(event, ...data);
    } 

    private async handle_handleFileCreateEvent(username: string, name: string, content: string, path: string) {
        this.instance.message_info(`Incoming file creation of file ${name} (by ${username})`);
        this.lastUpdatedFile = name;

        const writePath = this.instance.folderSupport ? join(this.instance.rootDir, path) : join(this.instance.rootDir, name);
        if (this.instance.folderSupport) await fs.promises.mkdir(path, { recursive: true });

        writeFileSync(writePath, content);
    }

    private async handle_handleFileEditEvent(username: string, name: string, content: string, path: string) {
        this.instance.message_info(`Incoming file edit of file ${name} (by ${username})`);
        this.lastUpdatedFile = name;

        const writePath = this.instance.folderSupport ? join(this.instance.rootDir, path) : join(this.instance.rootDir, name);
        if (this.instance.folderSupport) await fs.promises.mkdir(path, { recursive: true });
        writeFileSync(writePath, content);
    }

    private async handle_handleFileDeleteEvent(username: string, name: string, path: string) {
        this.instance.message_info(`Incoming file delete of file ${name} (by ${username})`);
        this.lastUpdatedFile = name;

        const writePath = this.instance.folderSupport ? join(this.instance.rootDir, path) : join(this.instance.rootDir, name);
        if (existsSync(writePath)) {
            unlinkSync(writePath);
        }
    }
}