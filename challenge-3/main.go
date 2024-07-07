package main

import (
	"bufio"
	"flag"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"strings"
)


func readUrlsFile(filePath string) ([]string, error) {
	inputFile, err := os.Open(*&filePath)
	if err != nil {
		return []string{}, err
	}
	defer inputFile.Close()

	urls := []string{}
	scanner := bufio.NewScanner(inputFile)
	for scanner.Scan() {
		url := scanner.Text()
		urls = append(urls, url)
	}
	return urls, nil
}

func directoryExists(path string) bool {
	info, err := os.Stat(path)
	if err != nil {
		return false
	}
	return info.IsDir()
}

func filePathForUrl(directoryPath string, url string) string {
	urlParts := strings.Split(url, "/")
	fileName := urlParts[len(urlParts)-1]
	directoryPath, _ = strings.CutSuffix(directoryPath, "/")
	return strings.Join([]string{directoryPath, fileName}, "/")
}



func downloadFile(url string, filePath string) error {
	outFile, err := os.Create(filePath)
	if err != nil {
		return err
	}
	defer outFile.Close()

	response, err := http.Get(url)
	if err != nil {
		return err
	}
	defer response.Body.Close()

	if response.StatusCode != http.StatusOK {
		return fmt.Errorf("Bad response status: %d", response.StatusCode)
	}

	_, err = io.Copy(outFile, response.Body)
	if err != nil {
		return err
	}

	return nil
}

func main() {
	inputFilePath := flag.String("in", "", "Path of the input file")
	outputDirectoryPath := flag.String("out", "", "Path to the output dir")
	flag.Parse()

	urls, err := readUrlsFile(*inputFilePath)
	if err != nil {
		log.Fatal(err)
	}

	if !directoryExists(*outputDirectoryPath) {
		log.Fatal("Output directory does not exist!")
	}

	for _, url := range urls {
		filePath := filePathForUrl(*outputDirectoryPath, url)
		err := downloadFile(url, filePath)
		if err != nil {
			log.Printf("Failed to download file from %s to %s", url, filePath)
		}
	}
}
