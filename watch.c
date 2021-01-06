#include <malloc.h>
#include <stdio.h>

#include <windows.h>
#include <shellapi.h>

#define internal static

#define true 1
#define false 0

internal void ExecuteCommand(char *param)
{
    printf("Running: \"%s\"\n", param + 3);
    ShellExecute(NULL, "open", "cmd.exe", param, NULL, SW_HIDE);
}

internal void WatchDirectories(char **dirs, int ndirs, char *param)
{
    HANDLE *changeHandles = _malloca(sizeof(HANDLE) * ndirs);
    for (int i = 0; i < ndirs; i++)
    {
        changeHandles[i] = FindFirstChangeNotification(
            dirs[i], true, FILE_NOTIFY_CHANGE_FILE_NAME | FILE_NOTIFY_CHANGE_LAST_WRITE);

        if (changeHandles[i] == INVALID_HANDLE_VALUE || changeHandles[i] == NULL)
        {
            fputs("FindFirstChangeNotification function failed.\n", stderr);
            ExitProcess(GetLastError());
        }
    }

    printf("Listening for file changes...\n");
    unsigned long waitStatus;
    while (true)
    {
        waitStatus = WaitForMultipleObjects(ndirs, changeHandles, false, INFINITE);
        if (WAIT_OBJECT_0 <= waitStatus && waitStatus < WAIT_OBJECT_0 + ndirs)
        {
            ExecuteCommand(param);
            if (!FindNextChangeNotification(changeHandles[waitStatus - WAIT_OBJECT_0]))
            {
                fputs("FindNextChangeNotification function failed.\n", stderr);
                ExitProcess(GetLastError());
            }
        }
        else if (waitStatus == WAIT_TIMEOUT)
        {
            continue;
        }
        else
        {
            fputs("Unhandled waitStatus.\n", stderr);
            ExitProcess(GetLastError());
        }
    }

    _freea(changeHandles);
}

internal void Usage(char *prog)
{
    fprintf(stderr, "usage: %s -d DIRECTORY [-d DIRECTORY ...] -c COMMAND\n", prog);
    ExitProcess(1);
}

int main(int argc, char *argv[])
{
    if (argc == 0)
    {
        ExitProcess(1);
    }
    else if (argc == 1)
    {
        Usage(argv[0]);
    }

    char *cmd = NULL;
    char **dirsToWatch = _malloca(sizeof(char *) * argc);
    int dirsToWatchCount = 0;

    for (int i = 1; i < argc; i++)
    {
        if (i + 1 == argc)
        {
            Usage(argv[0]);
        }

        if (!strcmp(argv[i], "-c"))
        {
            cmd = argv[++i];
        }
        else if (!strcmp(argv[i], "-d"))
        {
            dirsToWatch[dirsToWatchCount++] = argv[++i];
        }
        else
        {
            Usage(argv[0]);
        }
    }

    if (!cmd || dirsToWatchCount == 0)
    {
        Usage(argv[0]);
    }

    size_t cmdlen = strlen(cmd) + 1;
    char *param = _malloca(sizeof(char) * (cmdlen + 3));
    memcpy(param, "/C ", sizeof(char) * 3);
    memcpy(param + 3, cmd, sizeof(char) * cmdlen);

    ExecuteCommand(param);
    WatchDirectories(dirsToWatch, dirsToWatchCount, param);

    _freea(dirsToWatch);
    _freea(param);
    return 0;
}
