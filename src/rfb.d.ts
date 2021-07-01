declare module '@novnc/novnc/core/rfb' {

    export interface Capabilities {
        power: boolean;
    }

    export interface RfbCredentials {
        username: string;
        password: string;
        target: string;
    }

    export interface RfbOptions {
        credentials?: RfbCredentials;
        shared?: boolean;
        repeaterID?: string;
        wsProtocols?: string | string[];
        showDotCursor?: boolean;
    }

    export default class RFB {
        constructor(target: string, url: string, options: RfbOptions);
        viewOnly: boolean;
        readonly capabilities: Capabilities;
        touchButton: number;
        clipViewport: boolean;
        scaleViewport: boolean;
        resizeSession: boolean;
        showDotCursor: boolean;
        background: string;
        qualityLevel: number;
        compressionLevel: number;

        disconnect(): void;
        sendCredentials(creds: RfbCredentials): void;
        sendCtrlAltDel(): void;
        machineShutdown(): void;
        machineReboot(): void;
        machineReset(): void;
        sendKey(keysym: number, code: string, down: boolean): void;
        focus(): void;
        blur(): void;
        clipboardPasteFrom(text: string): void;

        static messages: MessageMethods;
        static cursors: Cursors;
    }

    interface Websock {}

    interface MessageMethods {
        keyEvent(sock: Websock, keysym: number, down: boolean): void;
        QEMUExtendedKeyEvent(sock: Websock, keysym: number, down: boolean, keycode: number): void;
        pointerEvent(sock: Websock, x: number, y: number, mask: number): void;
        extendedClipboardProvide(sock: Websock, formats: string[], inData: string[]): void;
        extendedClipboardNotify(sock: Websock, formats: string[]): void;
        extendedClipboardRequest(sock: Websock, formats: string[]): void;
        extendedClipboardCaps(sock: Websock, actions: number[], formats: string[]): void;
        clientCutText(sock: Websock, data: number[], extended: boolean): void;
        setDesktopSize(sock: Websock, width: number, height: number, id: number, flags: number): void;
        clientFence(sock: Websock, flags: number, payload: string): void;
        enableContinuousUpdates(sock: Websock, enable: number, x: number, y: number, width: number, height: number): void
        pixelFormat(sock: Websock, depth: number, trueColor: number): void;
        clientEncodings(sock: Websock, encodings: number[]): void;
        fbUpdateRequest(sock: Websock, incremental: boolean, x: number, y: number, w: number, h: number): void;
        xvpOp(sock: Websock, ver: number, op: number): void;
    }

    interface Cursor {
        rgbapixels: Uint8Array;
        w: number;
        h: number;
        hotx: number;
        hoty: number;
    }

    interface Cursors {
        none: Cursor;
        dot: Cursor;
    }
}
