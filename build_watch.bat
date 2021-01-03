@echo off

set flags= -DWIN32_LEAN_AND_MEAN=1 -nologo -W4
set libs= /link user32.lib Shell32.lib

cl %flags% watch.c %libs% /out:watch.exe
