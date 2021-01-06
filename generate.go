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

func readFile(source string) (os.FileInfo, []byte, error) {
	file, err := os.Open(source)
	if err != nil {
		return nil, nil, err
	}

	defer file.Close()

	info, err := file.Stat()
	if err != nil {
		return nil, nil, err
	}

	bytes := make([]byte, info.Size())
	buff := bufio.NewReader(file)
	_, err = buff.Read(bytes)
	return info, bytes, err
}

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

func writeCssClasses(
	table map[string]interface{},
	builder *strings.Builder,
	prefix string,
	propsFn func(interface{}) string) {
	for key, value := range table {
		builder.WriteString(".")
		builder.WriteString(prefix)
		if key != "" {
			builder.WriteString("-")
			builder.WriteString(globalCssClassReplacer.Replace(key))
		}
		builder.WriteString(" { ")
		builder.WriteString(propsFn(value))
		builder.WriteString(" }\n")
	}
}

func writeOneCssClass(builder *strings.Builder, class string, body string) {
	builder.WriteString(".")
	builder.WriteString(class)
	builder.WriteString(" { ")
	builder.WriteString(body)
	builder.WriteString(" }\n")
}

func stringifyProperty(prop string) func(interface{}) string {
	return func(v interface{}) string {
		return prop + ": " + v.(string) + ";"
	}
}

func writeSpacingClasses(
	spacing map[string]interface{},
	builder *strings.Builder,
	prefix string,
	property string) {
	writeCssClasses(spacing, builder, prefix, stringifyProperty(property))
	writeCssClasses(spacing, builder, prefix+"x", func(v interface{}) string {
		pad := v.(string)
		return fmt.Sprintf("%s-left: %s; %s-right: %s", property, pad, property, pad)
	})
	writeCssClasses(spacing, builder, prefix+"y", func(v interface{}) string {
		pad := v.(string)
		return fmt.Sprintf("%s-top: %s; %s-bottom: %s", property, pad, property, pad)
	})
	writeCssClasses(spacing, builder, prefix+"l", stringifyProperty(property+"-left"))
	writeCssClasses(spacing, builder, prefix+"r", stringifyProperty(property+"-right"))
	writeCssClasses(spacing, builder, prefix+"t", stringifyProperty(property+"-top"))
	writeCssClasses(spacing, builder, prefix+"b", stringifyProperty(property+"-bottom"))
}

func writeAllCssClasses(config map[string]interface{}, builder *strings.Builder, variant string) {
	screens := config["screens"].(map[string]interface{})

	spacing := config["spacing"].(map[string]interface{})
	negativeSpacing := make(map[string]interface{})

	for key, value := range spacing {
		negativeSpacing[key] = "-" + value.(string)
	}

	writeSpacingClasses(spacing, builder, variant+"p", "padding")
	writeSpacingClasses(spacing, builder, variant+"m", "margin")
	writeSpacingClasses(negativeSpacing, builder, variant+"-m", "margin")
	writeSpacingClasses(map[string]interface{}{"auto": "auto"}, builder, variant+"m", "margin")

	widths := config["width"].(map[string]interface{})
	writeCssClasses(spacing, builder, variant+"w", stringifyProperty("width"))
	writeCssClasses(widths, builder, variant+"w", stringifyProperty("width"))
	heights := config["height"].(map[string]interface{})
	writeCssClasses(spacing, builder, variant+"h", stringifyProperty("height"))
	writeCssClasses(heights, builder, variant+"h", stringifyProperty("height"))

	maxWidths := config["maxWidth"].(map[string]interface{})
	writeCssClasses(maxWidths, builder, variant+"max-w", stringifyProperty("max-width"))
	for key, value := range screens {
		writeOneCssClass(builder, variant+"max-w-screen-"+key, "max-width: "+value.(string)+";")
	}

	colors := config["colors"].(map[string]interface{})
	writeCssClasses(colors, builder, variant+"bg", stringifyProperty("background-color"))
	writeCssClasses(colors, builder, variant+"fg", stringifyProperty("color"))
	writeCssClasses(colors, builder, "dark ."+variant+"bg", stringifyProperty("background-color"))
	writeCssClasses(colors, builder, "dark ."+variant+"fg", stringifyProperty("color"))

	writeCssClasses(config["fontSize"].(map[string]interface{}),
		builder, variant+"text", func(v interface{}) string {
			obj := v.(map[string]interface{})
			return fmt.Sprintf("font-size: %s; line-height: %s;",
				obj["size"].(string), obj["line-height"].(string))
		})

	writeCssClasses(config["fontWeight"].(map[string]interface{}),
		builder, variant+"font", stringifyProperty("font-weight"))

	borderRadius := config["borderRadius"].(map[string]interface{})
	writeCssClasses(borderRadius, builder, variant+"rounded", stringifyProperty("border-radius"))
	writeCssClasses(borderRadius, builder, variant+"rounded-t", func(v interface{}) string {
		size := v.(string)
		return fmt.Sprintf("border-top-left-radius: %s; border-top-right-radius: %s;", size, size)
	})
	writeCssClasses(borderRadius, builder, variant+"rounded-b", func(v interface{}) string {
		size := v.(string)
		return fmt.Sprintf("border-bottom-left-radius: %s; border-bottom-right-radius: %s;", size, size)
	})
	writeCssClasses(borderRadius, builder, variant+"rounded-l", func(v interface{}) string {
		size := v.(string)
		return fmt.Sprintf("border-top-left-radius: %s; border-bottom-left-radius: %s;", size, size)
	})
	writeCssClasses(borderRadius, builder, variant+"rounded-r", func(v interface{}) string {
		size := v.(string)
		return fmt.Sprintf("border-top-right-radius: %s; border-bottom-right-radius: %s;", size, size)
	})
	writeCssClasses(borderRadius, builder, variant+"rounded-tl",
		stringifyProperty("border-top-left-radius"))
	writeCssClasses(borderRadius, builder, variant+"rounded-tr",
		stringifyProperty("border-top-right-radius"))
	writeCssClasses(borderRadius, builder, variant+"rounded-bl",
		stringifyProperty("border-bottom-left-radius"))
	writeCssClasses(borderRadius, builder, variant+"rounded-br",
		stringifyProperty("border-bottom-right-radius"))

	writeOneCssClass(builder, variant+"block", "display: block;")
	writeOneCssClass(builder, variant+"inline-block", "display: inline-block;")
	writeOneCssClass(builder, variant+"flex", "display: flex;")
	writeOneCssClass(builder, variant+"inline-flex", "display: inline-flex;")
	writeOneCssClass(builder, variant+"grid", "display: grid;")
	writeOneCssClass(builder, variant+"inline-grid", "display: inline-grid;")
	writeOneCssClass(builder, variant+"contents", "display: contents;")
	writeOneCssClass(builder, variant+"hidden", "display: none;")

	writeOneCssClass(builder, variant+"flex-row", "flex-direction: row;")
	writeOneCssClass(builder, variant+"flex-row-reverse", "flex-direction: row-reverse;")
	writeOneCssClass(builder, variant+"flex-col", "flex-direction: column;")
	writeOneCssClass(builder, variant+"flex-col-reverse", "flex-direction: column-reverse;")

	writeOneCssClass(builder, variant+"items-start", "align-items: flex-start;")
	writeOneCssClass(builder, variant+"items-end", "align-items: flex-end;")
	writeOneCssClass(builder, variant+"items-center", "align-items: center;")
	writeOneCssClass(builder, variant+"items-baseline", "align-items: baseline;")
	writeOneCssClass(builder, variant+"items-stretch", "align-items: stretch;")

	writeOneCssClass(builder, variant+"justify-start", "justify-content: flex-start;")
	writeOneCssClass(builder, variant+"justify-end", "justify-content: flex-end;")
	writeOneCssClass(builder, variant+"justify-center", "justify-content: center;")
	writeOneCssClass(builder, variant+"justify-between", "justify-content: space-between;")
	writeOneCssClass(builder, variant+"justify-around", "justify-content: space-around;")
	writeOneCssClass(builder, variant+"justify-evenly", "justify-content: space-evenly;")

	writeOneCssClass(builder, variant+"text-left", "text-align: left;")
	writeOneCssClass(builder, variant+"text-center", "text-align: center;")
	writeOneCssClass(builder, variant+"text-right", "text-align: right;")
	writeOneCssClass(builder, variant+"text-justify", "text-align: justify;")
}

func generateCss(dest string) {
	configInfo, bdata, err := readFile("css-config.json")
	if err != nil {
		panic(err)
	}

	fout1, err := os.Open(dest)
	if err == nil {
		info, err := fout1.Stat()
		if err != nil {
			panic(err)
		}

		if configInfo.ModTime().Before(info.ModTime()) {
			return
		}
	}

	var config map[string]interface{}
	json.Unmarshal(bdata, &config)

	var builder strings.Builder
	writeAllCssClasses(config, &builder, "")

	screens := config["screens"].(map[string]interface{})
	for key, value := range screens {
		builder.WriteString("@media (min-width: ")
		builder.WriteString(value.(string))
		builder.WriteString(") {\n")
		writeAllCssClasses(config, &builder, key+"\\:")
		builder.WriteString("}\n")
	}

	fout2, err := os.Create(dest)
	if err != nil {
		panic(err)
	}

	defer fout2.Close()

	fout2.WriteString(builder.String())
	fmt.Println("Created:", dest)
}

func main() {
	generateAllPages("pages", "dist")
	copyStatic("static", "dist")
	generateCss("dist" + globalPathSeparator + "utilities.css")
}
