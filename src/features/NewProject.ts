/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/

import vscode = require('vscode');
import { IFeature } from '../feature';
import { LanguageClient, RequestType, NotificationType } from 'vscode-languageclient';

interface SessionInitFunc {
    (doneFunc: (boolean) => void): void;
}

export class NewProjectFeature implements IFeature {

    private command: vscode.Disposable;
    private languageClient: LanguageClient;

    constructor(private sessionInitFunc: SessionInitFunc) {
        this.command =
            vscode.commands.registerCommand('PowerShell.NewProject', () => {
                var token = new vscode.CancellationTokenSource();
                vscode.window.showQuickPick(["Cancel"], { placeHolder: "Please wait..." }, token.token);

                // Show "Please wait" in case
                sessionInitFunc((isLoaded) => { /*token.cancel();*/ this.onSessionStarted(isLoaded) });
            });
    }

    public setLanguageClient(languageClient: LanguageClient) {
        this.languageClient = languageClient;
    }

    public dispose() {
        this.command.dispose();
    }

    private onSessionStarted(isLoaded: boolean) {
    }
}