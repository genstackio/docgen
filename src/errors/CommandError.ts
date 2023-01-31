export class CommandError extends Error {
    public readonly error: Error;
    public readonly stdout: string;
    public readonly stderr: string;
    public readonly cmd: string;
    constructor(cmd: string, error: Error, stdout: string, stderr: string) {
        super(`Command ${cmd} failed with error: ${error?.message}`);
        this.error = error;
        this.stdout = stdout;
        this.stderr = stderr;
        this.cmd = cmd;
    }
}

export default CommandError;