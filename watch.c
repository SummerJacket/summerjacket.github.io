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

internal void WatchDirectory(char *dir, char *param)
{
    HANDLE changeHandle = FindFirstChangeNotification(
        dir, true, FILE_NOTIFY_CHANGE_FILE_NAME | FILE_NOTIFY_CHANGE_LAST_WRITE);

    if (changeHandle == INVALID_HANDLE_VALUE || changeHandle == NULL)
    {
        fputs("FindFirstChangeNotification function failed.\n", stderr);
        ExitProcess(GetLastError());
    }

    printf("Listening for file changes...\n");
    DWORD waitStatus;
    while (true)
    {
        waitStatus = WaitForSingleObject(changeHandle, INFINITE);
        switch (waitStatus)
        {
        case WAIT_OBJECT_0:
            ExecuteCommand(param);
            if (!FindNextChangeNotification(changeHandle))
            {
                fputs("FindNextChangeNotification function failed.\n", stderr);
                ExitProcess(GetLastError());
            }
            break;

        case WAIT_TIMEOUT:
            break;

        default:
            fputs("Unhandled waitStatus.\n", stderr);
            ExitProcess(GetLastError());
            break;
        }
    }
}

internal void Usage(char *prog)
{
    fprintf(stderr, "usage: %s -d DIRECTORY -c COMMAND\n", prog);
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
    char *dirToWatch = NULL;

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
            dirToWatch = argv[++i];
        }
        else
        {
            Usage(argv[0]);
        }
    }

    if (!cmd || !dirToWatch)
    {
        Usage(argv[0]);
    }

    size_t cmdlen = strlen(cmd) + 1;
    char *param = _malloca(sizeof(char) * (cmdlen + 3));
    memcpy(param, "/C ", sizeof(char) * 3);
    memcpy(param + 3, cmd, sizeof(char) * cmdlen);

    ExecuteCommand(param);
    WatchDirectory(dirToWatch, param);

    _freea(param);
    return 0;
}
