package main

import (
	"bufio"
	"encoding/json"
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

var globalPathSeparator = string(os.PathSeparator)
var globalCssClassReplacer = strings.NewReplacer(".", "\\.", ":", "\\:", "/", "\\/")

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

	defer file.Close()

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

	return nil
}

func generateAllPages(sourceDir string, destDir string) {
	pageRegex, err := regexp.Compile("^[^_]+\\.html$")
	if err != nil {
		panic(err)
	}

	overrrideAll := false

	fBaseof, err := os.Open(sourceDir + globalPathSeparator + "_baseof.html")
	if err != nil {
		panic(err)
	}

	baseofInfo, err := fBaseof.Stat()
	if err != nil {
		panic(err)
	}

	if !isFileNewer(".baseof-modtime", baseofInfo.ModTime()) {
		overrrideAll = true

		f, err := os.Create(".baseof-modtime")
		if err != nil {
			panic(err)
		}

		f.Close()
	}

	var buff strings.Builder
	_, err = io.Copy(&buff, fBaseof)
	if err != nil {
		panic(err)
	}

	baseofTemplate := buff.String()
	err = filepath.Walk(sourceDir, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}

		if info.IsDir() || !pageRegex.MatchString(info.Name()) {
			return nil
		}

		dest := destDir + globalPathSeparator + dropHeadDirectory(path)

		if !overrrideAll && isFileNewer(dest, info.ModTime()) {
			return nil
		}

		if err = generatePage(baseofTemplate, path, dest); err != nil {
			return err
		}

		fmt.Println("Generated:", dest)
		return nil
	})

	if err != nil {
		panic(err)
	}
}

func copyStatic(sourceDir string, destDir string) {
	err := filepath.Walk(sourceDir, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}

		if info.IsDir() {
			return nil
		}

		dest := destDir + globalPathSeparator + dropHeadDirectory(path)
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

type CssConfig struct {
	Screens map[string]string
	Colors  map[string]string
	Spacing map[string]string
}

func makeCssClasses(
	table map[string]string,
	builder *strings.Builder,
	prefix string,
	propList []string) {
	for key, value := range table {
		builder.WriteString(".")
		builder.WriteString(prefix)
		builder.WriteString("-")
		builder.WriteString(globalCssClassReplacer.Replace(key))
		builder.WriteString(" { ")

		for _, prop := range propList {
			builder.WriteString(fmt.Sprintf(prop, value))
			builder.WriteString("; ")
		}

		builder.WriteString("}\n")
	}
}

func makeAllCssClasses(config CssConfig, builder *strings.Builder, variant string) {
	makeCssClasses(config.Spacing, builder,
		variant+"p", []string{"padding: %s"})
	makeCssClasses(config.Spacing, builder,
		variant+"px", []string{"padding-left: %s", "padding-right: %s"})
	makeCssClasses(config.Spacing, builder,
		variant+"py", []string{"padding-top: %s", "padding-bottom: %s"})
	makeCssClasses(config.Spacing, builder,
		variant+"pl", []string{"padding-left: %s"})
	makeCssClasses(config.Spacing, builder,
		variant+"pr", []string{"padding-right: %s"})
	makeCssClasses(config.Spacing, builder,
		variant+"pt", []string{"padding-top: %s"})
	makeCssClasses(config.Spacing, builder,
		variant+"pb", []string{"padding-bottom: %s"})

	makeCssClasses(config.Spacing, builder,
		variant+"m", []string{"margin: %s"})
	makeCssClasses(config.Spacing, builder,
		variant+"mx", []string{"margin-left: %s", "margin-right: %s"})
	makeCssClasses(config.Spacing, builder,
		variant+"my", []string{"margin-top: %s", "margin-bottom: %s"})
	makeCssClasses(config.Spacing, builder,
		variant+"ml", []string{"margin-left: %s"})
	makeCssClasses(config.Spacing, builder,
		variant+"mr", []string{"margin-right: %s"})
	makeCssClasses(config.Spacing, builder,
		variant+"mt", []string{"margin-top: %s"})
	makeCssClasses(config.Spacing, builder,
		variant+"mb", []string{"margin-bottom: %s"})

	makeCssClasses(config.Spacing, builder,
		variant+"-m", []string{"margin: -%s"})
	makeCssClasses(config.Spacing, builder,
		variant+"-mx", []string{"margin-left: -%s", "margin-right: -%s"})
	makeCssClasses(config.Spacing, builder,
		variant+"-my", []string{"margin-top: -%s", "margin-bottom: -%s"})
	makeCssClasses(config.Spacing, builder,
		variant+"-ml", []string{"margin-left: -%s"})
	makeCssClasses(config.Spacing, builder,
		variant+"-mr", []string{"margin-right: -%s"})
	makeCssClasses(config.Spacing, builder,
		variant+"-mt", []string{"margin-top: -%s"})
	makeCssClasses(config.Spacing, builder,
		variant+"-mb", []string{"margin-bottom: -%s"})

	makeCssClasses(config.Spacing, builder,
		variant+"w", []string{"width: %s"})
	makeCssClasses(config.Spacing, builder,
		variant+"h", []string{"height: %s"})

	makeCssClasses(config.Colors, builder,
		variant+"bg", []string{"background-color: %s"})
	makeCssClasses(config.Colors, builder,
		variant+"fg", []string{"color: %s"})
}

func generateCss(dest string) {
	bdata, err := ioutil.ReadFile("css-config.json")
	if err != nil {
		panic(err)
	}

	var config CssConfig
	json.Unmarshal(bdata, &config)

	var builder strings.Builder
	makeAllCssClasses(config, &builder, "")

	for key, value := range config.Screens {
		builder.WriteString("@media (min-width: ")
		builder.WriteString(value)
		builder.WriteString(") {\n")
		makeAllCssClasses(config, &builder, key + "\\:")
		builder.WriteString("}\n")
	}

	fout, err := os.Create(dest)
	if err != nil {
		panic(err)
	}

	defer fout.Close()

	fout.WriteString(builder.String())
	fmt.Println("Created:", dest)
}

func main() {
	generateAllPages("pages", "dist")
	copyStatic("static", "dist")
	generateCss("dist" + globalPathSeparator + "utilities.css")
}
