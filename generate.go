package main

import (
	"bufio"
	"fmt"
	"html/template"
	"io/ioutil"
	"os"
	"path/filepath"
	"regexp"
	"strings"
)

func generatePage(baseofTemplate string, path string) error {
	bdata, err := ioutil.ReadFile(path)
	if err != nil {
		return err
	}

	tmpl, err := template.New(path).Funcs(template.FuncMap{
		"safeHTML": func(html string) template.HTML {
			return template.HTML(html)
		},
	}).Parse(baseofTemplate + string(bdata))
	if err != nil {
		return err
	}

	sep := string(os.PathSeparator)
	splitPath := strings.Split(path, sep)
	dropRoot := strings.Join(splitPath[1:], sep)

	if err := os.MkdirAll("build/"+filepath.Dir(dropRoot), os.ModePerm); err != nil {
		return err
	}

	fout, err := os.Create("build/" + dropRoot)
	if err != nil {
		return err
	}

	defer fout.Close()

	wout := bufio.NewWriter(fout)
	if err := tmpl.Execute(wout, nil); err != nil {
		return err
	}
	wout.Flush()

	fmt.Println("Generated:", dropRoot)
	return nil
}

func main() {
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

		if err = generatePage(baseofTemplate, path); err != nil {
			return err
		}

		return nil
	})

	if err != nil {
		panic(err)
	}
}
