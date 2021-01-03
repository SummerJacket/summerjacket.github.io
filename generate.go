package main

import (
	"bufio"
	"fmt"
	"html/template"
	"io"
	"io/ioutil"
	"os"
	"path/filepath"
	"regexp"
	"strings"
	"time"
)

var globalPathSeparator string = string(os.PathSeparator)

func copyFile(source string, dest string) error {
	in, err := os.Open(source)
	if err != nil {
		return err
	}

	defer in.Close()

	out, err := os.Create(dest)
	if err != nil {
		return err
	}

	defer out.Close()

	_, err = io.Copy(out, in)
	if err != nil {
		return err
	}

	return nil
}

func isFileNewer(path string, fileTime time.Time) bool {
	file, err := os.Open(path)
	if err != nil {
		return false
	}

	info, err := file.Stat()
	if err != nil {
		return false
	}

	return info.ModTime().After(fileTime)
}

func dropHeadDirectory(path string) string {
	splitPath := strings.Split(path, globalPathSeparator)
	return strings.Join(splitPath[1:], globalPathSeparator)
}

func generatePage(baseofTemplate string, source string, dest string) error {
	bdata, err := ioutil.ReadFile(source)
	if err != nil {
		return err
	}

	tmpl, err := template.New(source).Funcs(template.FuncMap{
		"safeHTML": func(html string) template.HTML {
			return template.HTML(html)
		},
	}).Parse(baseofTemplate + string(bdata))
	if err != nil {
		return err
	}

	if err := os.MkdirAll(filepath.Dir(dest), os.ModePerm); err != nil {
		return err
	}

	fout, err := os.Create(dest)
	if err != nil {
		return err
	}

	defer fout.Close()

	wout := bufio.NewWriter(fout)
	if err := tmpl.Execute(wout, nil); err != nil {
		return err
	}
	wout.Flush()

	fmt.Println("Generated:", dest)
	return nil
}

func generateAllPages() {
	pageRegex, err := regexp.Compile("^[^_]+\\.html$")
	if err != nil {
		panic(err)
	}

	bdataBaseof, err := ioutil.ReadFile("pages/_baseof.html")
	if err != nil {
		panic(err)
	}

	baseofTemplate := string(bdataBaseof)

	err = filepath.Walk("pages", func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}

		if info.IsDir() || !pageRegex.MatchString(info.Name()) {
			return nil
		}

		dest := "dist" + globalPathSeparator + dropHeadDirectory(path)

		if isFileNewer(dest, info.ModTime()) {
			return nil
		}

		if err = generatePage(baseofTemplate, path, dest); err != nil {
			return err
		}

		return nil
	})

	if err != nil {
		panic(err)
	}
}

func copyStatic() {
	err := filepath.Walk("static", func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}

		if info.IsDir() {
			return nil
		}

		dest := "dist" + globalPathSeparator + dropHeadDirectory(path)
		if isFileNewer(dest, info.ModTime()) {
			return nil
		}

		if err := os.MkdirAll(filepath.Dir(dest), os.ModePerm); err != nil {
			return err
		}

		if err := copyFile(path, dest); err != nil {
			return err
		}

		fmt.Println("Copied:", dest)

		return nil
	})

	if err != nil {
		panic(err)
	}
}

func main() {
	generateAllPages()
	copyStatic()
}
