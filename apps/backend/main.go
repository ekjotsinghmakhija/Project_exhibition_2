package main

import (
	"fmt"
	"log"
	"net/http"
)

func main() {
	http.HandleFunc("/api/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(`{"status": "Go Backend is Online", "version": "v7.0"}`))
	})

	fmt.Println("Sanjeevani Go Server running on port 8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
